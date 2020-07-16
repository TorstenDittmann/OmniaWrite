import { get } from "svelte/store";

import {
  projects,
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
      return currentBlock.data ? `<p>${smartenText(currentBlock.data.text)}</p>` : [];
    }
    const sceneMapper = currentScene => currentScene.content.blocks.flatMap(blockMapper);
    const chapterMapper = (currentChapter) => {
      return {
        title: currentChapter.title,
        data: get(scenes)
          .filter(scene => scene.chapter == currentChapter.id && scene.content)
          .sort(this.compare)
          .map(sceneMapper)
          .join(" ")
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