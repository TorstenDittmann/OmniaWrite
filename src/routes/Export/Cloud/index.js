import {
  projects,
  chapters,
  scenes
} from "../../../stores";

let unsubscribeProject;
let unsubscribeChapters;
let unsubscribeScenes;

export default class Export {
  constructor(id) {
    this.projectId = id;
  }
  async fetchTemplate() {
    unsubscribeProject = await projects.subscribe(value => {
      value.filter(e => e.id == this.projectId).forEach(project => {
        this.projectData = project;
      })
    });
    let data = [];
    const start = async () => {
      unsubscribeChapters = chapters
        .subscribe(value => {
          value
            .filter(e => e.project == this.projectId)
            .sort(this.compare)
            .forEach((element, i) => {
              unsubscribeScenes = scenes
                .subscribe(value => {
                  data.push({
                    title: element.title,
                    data: value
                      .filter(e => e.chapter == element.id)
                      .sort(this.compare)
                      .map(e => {
                        if (e.content)
                          return e.content.blocks.map(block => {
                            return `<p>${block.data.text}</p>`
                          }).join("")
                      }).join("")
                  })
                });
            });
        });
      unsubscribeProject();
      unsubscribeChapters();
      unsubscribeScenes();
      return data;
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