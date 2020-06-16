import {
  projects,
  chapters,
  scenes
} from "./stores";
import saveAs from "file-saver";

const {
  messageUI
} = window.deskgap || {};

let unsubscribeProject;
let unsubscribeChapters;
let unsubscribeScenes;

export class ExportRTF {
  constructor(id, author) {
    this.projectId = id;
    this.projectAuthor = author;

    this.header = "{\\rtf1\\ansicpg65001\\deff0{\\fonttbl}\\pard\\qc\\fs120\\b TITLE\\pard\\b0 ";
    this.chapter = "\\page\\fs32\\b CHAPTER\\par\\pard \\b0\\fs22 "
    this.block = "BLOCK \\par "
    this.footer = "}";
  }

  async fetchTemplate() {
    unsubscribeProject = await projects.subscribe(value => {
      value.filter(e => e.id == this.projectId).forEach(project => {
        this.projectData = project;
      })
    });
    let content = "";
    const start = async () => {

      this.header = this.header.replace("TITLE", this.projectData.title);
      content += this.header;
      unsubscribeChapters = chapters.subscribe(value => {
        value.filter(e => e.project == this.projectId).sort(this.compare).forEach((element, i) => {
          let chapterContent = this.chapter;
          chapterContent = chapterContent.replace("CHAPTER", element.title);

          unsubscribeScenes = scenes.subscribe(value => {
            value.filter(e => e.chapter == element.id).sort(this.compare).forEach((scene) => {
              let sceneContent = "";
              if (scene.content) {
                scene.content.blocks.forEach(block => {
                  let blockContent = this.block.replace("BLOCK", block.data.text);
                  blockContent = blockContent.replace(/<br>/gi, "\\par ");

                  blockContent = blockContent.replace(/<b>/gi, "\\b ");
                  blockContent = blockContent.replace(/<\/b>/gi, "\\b0 ");

                  blockContent = blockContent.replace(/<i>/gi, "\\i ");
                  blockContent = blockContent.replace(/<\/i>/gi, "\\i0 ");


                  blockContent = blockContent.replace(/<q class="cdx-quote">/gi, "\\ldblquote ");
                  blockContent = blockContent.replace(/<\/q>/gi, "\\rdblquote	");

                  sceneContent += blockContent;
                })
                chapterContent += sceneContent;
              }
            });
            content += chapterContent;
          });
          if ((i + 1) == value.filter(e => e.project == this.projectId).length) {
            content += this.footer;
            let blob = new Blob([content], {
              type: "text/plain"
            });
            if (window.deskgap) {
              let base64 = btoa(unescape(encodeURIComponent(content)));
              messageUI.send("saveFile", base64, this.projectData.title + ".rtf");
            } else {
              saveAs.saveAs(blob, this.projectData.title + ".rtf");
            }
          }
        });
      });
      unsubscribeProject();
      unsubscribeChapters();
      unsubscribeScenes();
    }
    return start();

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
