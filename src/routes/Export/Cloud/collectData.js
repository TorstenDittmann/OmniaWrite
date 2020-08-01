import { get } from "svelte/store";

import {
  chapters,
  scenes
} from "../../../stores";

import { smartenText } from "../../../utils";

export default class Export {
  constructor(id) {
    this.projectId = id;
  }
  async fetchData() {
    const blockMapper = (currentBlock) => {
      if (!currentBlock.data) return [];

      const text = currentBlock.data.text
        .replace(/(\s|<br \/>)+$/, ""); // trim whitespace and unnecessary linebreaks at the end

      switch (currentBlock.type) {
        case "paragraph":
          return `<p>${smartenText(text.replace("<br />", "</p><p>"))}</p>`;
        case "quote":
          return `<blockquote>${smartenText(text)}</blockquote>`;
        case "heading":
          return `<h2>${smartenText(text)}</h2>`;
        case "code":
          return `<pre><code>${text}</code></pre>`;
        default:
          return `<p>${text}</p>`;
      }
    }
    const sceneMapper = currentScene => currentScene.content.blocks.flatMap(blockMapper);
    const chapterMapper = (currentChapter) => {
      return {
        title: currentChapter.title,
        data: get(scenes)
          .filter(scene => scene.chapter == currentChapter.id && scene.content)
          .sort(this.compare)
          .map(sceneMapper)
          .flat()
          .join("")
      }
    };
    return get(chapters)
      .filter(e => e.project == this.projectId)
      .sort(this.compare)
      .map(chapterMapper);
  }
  compare(a, b) {
    if (a.order < b.order) {
      return -1;
    }
    if (a.order > b.order) {
      return 1;
    }
    return 0;
  }
}