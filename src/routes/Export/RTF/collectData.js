import { get } from "svelte/store";

import { projects, chapters, scenes } from "../../../stores";

import { smartenText, toFileName } from "../../../utils";

const toRTF = text => {
  return text
    .replace(/([\\{}])/g, "\\$1") // escape RTF special characters
    .replace(/\u00A0/g, "\\~") // non-breaking space
    .replace(/\u00AD/g, "\\-") // optional hyphen
    .replace(/\u2011/g, "\\_") // non-breaking hyphen
    .replace(/[^ -~]/g, c => `\\u${c.charCodeAt()}?`) // escape unicode
    .replace(/<br\W*>/gi, "\\line ") // line breaks
    .replace(/<(i|em)>/gi, "\\i ") // italic
    .replace(/<\/(i|em)>/gi, "\\i0 ")
    .replace(/<(b|strong)>/gi, "\\b ") // bold
    .replace(/<\/(b|strong)>/gi, "\\b0 ")
    .replace(/<u>/gi, "\\ul ") // underline
    .replace(/<\/u>/gi, "\\ul0 ")
    .replace(/&gt;/g, ">") // unescape HTML special characters
    .replace(/&lt;/g, "<")
    .replace(/&amp;/g, "&");
};

export default class Export {
  constructor(id) {
    this.projectId = id;
  }
  async fetchData() {
    const blockMapper = currentBlock => {
      if (!currentBlock.data) return [];

      let text = currentBlock.data.text.replace(/(\s|<br \/>)+$/, ""); // trim trailing whitespace

      switch (currentBlock.type) {
        case "paragraph":
          return `{\\f0\\sb50\\sa50\\fi300\\sl276\\slmult1\\qj ${toRTF(
            smartenText(text)
          )}\\par}\n`;
        case "quote":
          return `{\\f0\\fi-200\\li850\\ri600\\lin850\\sb300\\sa300\\i\\u8220"\\~${toRTF(
            smartenText(text)
          )}\\~\\u8221"\\par}\n`;
        case "heading":
          return `{\\f1\\sb300\\sa300\\qc\\fs40\\b ${toRTF(
            smartenText(text)
          )}\\par}\n`;
        case "code":
          return `{\\f2\\fi0\\li300\\ri300\\lin300\\sb300\\sa300\\box\\brdrhair\\brdrw1\\brdrcf1\\brsp113 ${toRTF(
            text
          )}\\par}\n`;
        default:
          return `{${toRTF(text)}\\par}\n`;
      }
    };

    const sceneMapper = currentScene =>
      currentScene.content.blocks.flatMap(blockMapper).join("");

    const chapterMapper = currentChapter => {
      return (
        `{\\f1\\fs60\\qc\\sa500\\b ${toRTF(currentChapter.title)}\\par}\n` +
        get(scenes)
          .filter(scene => scene.chapter == currentChapter.id && scene.content)
          .sort(this.compare)
          .map(sceneMapper)
          .join("{\\f1\\qc\\sb300\\sa300 * * *\\par}\n")
      );
    };

    const title = get(projects).find(e => e.id == this.projectId).title;
    const fonts =
      "{\\fonttbl{\\f0\\froman Times New Roman;}{\\f1\\fswiss Arial;}{\\f2\\fmodern Courier New;}}\n";
    const colors = "{\\colortbl;\\red160\\green160\\blue160;}\n";
    const frontpage = `{\\f1\\fs120\\qc\\b\\scaps  \\line  \\line ${toRTF(
      smartenText(title)
    )}\\par}\\page\n`;

    const contents = get(chapters)
      .filter(e => e.project == this.projectId)
      .sort(this.compare)
      .map(chapterMapper)
      .join("\\page\n");

    const document =
      "{\\rtf1\\ansi\\deff0\n" + fonts + colors + frontpage + contents + "}";

    return {
      document: document,
      filename: toFileName(title) + ".rtf",
    };
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
