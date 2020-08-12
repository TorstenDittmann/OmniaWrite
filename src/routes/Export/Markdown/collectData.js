import { get } from "svelte/store";

import {
  projects,
  chapters,
  scenes
} from "../../../stores";

import { smartenText, toFileName } from "../../../utils";

const toMarkdown = (text) => {
  return text
    .replace(/(_|\*)/g, "\\$1") // escape Markdown special characters
    .replace(/<br\W*>/gi, "\n") // line breaks
    .replace(/<(i|em)>/gi, "_") // italic
    .replace(/<\/(i|em)>/gi, "_")
    .replace(/<(b|strong)>/gi, "**") // bold
    .replace(/<\/(b|strong)>/gi, "**")
    .replace(/&gt;/g, ">") // unescape HTML special characters
    .replace(/&lt;/g, "<")
    .replace(/&amp;/g, "&");
}

export default async project => {
  const blockMapper = (currentBlock) => {
    if (!currentBlock.data) return [];

    let text = currentBlock.data.text
      .replace(/(\s|<br \/>)+$/, "").trim(); // trim trailing whitespace

    switch (currentBlock.type) {
      case "paragraph":
        return `${toMarkdown(smartenText(text))}\n\n`;
      case "quote":
        return `> ${toMarkdown(smartenText(text))}\n\n`;
      case "heading":
        return `### ${toMarkdown(smartenText(text))}\n\n`;
      case "code":
        return `\`\`\`\n${toMarkdown(text)}\n\`\`\`\n\n`;
      default:
        return `${toMarkdown(text)}\n\n`;
    }
  }

  const sceneMapper = currentScene => currentScene.content.blocks.flatMap(blockMapper).join("");

  const chapterMapper = (currentChapter) => {
    return (`## ${toMarkdown(currentChapter.title)}\n\n`
      + get(scenes)
        .filter(scene => scene.chapter == currentChapter.id && scene.content)
        .sort(compare)
        .map(sceneMapper)
        .join("***\n\n")
    );
  };

  const title = get(projects).find(e => e.id == project).title;
  const frontpage = `# ${toMarkdown(smartenText(title))}\n\n`;
  const toc = get(chapters)
    .filter(e => e.project == project)
    .sort(compare)
    .reduce((prev, curr) => `${prev}- [${curr.title}](#${curr.title.replace(/[^a-zA-Z0-9]/g, "-")})\n`, "")

  const contents = get(chapters)
    .filter(e => e.project == project)
    .sort(compare)
    .map(chapterMapper)
    .join("\n\n");

  const document = frontpage
    + toc
    + contents;

  return {
    document: document,
    filename: toFileName(title) + ".md"
  };
}

const compare = (a, b) => {
  if (a.order < b.order) {
    return -1;
  }
  if (a.order > b.order) {
    return 1;
  }
  return 0;
}
