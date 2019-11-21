import {
    projects,
    chapters,
    scenes
} from "./stores";
import JSZip from 'jszip';
import saveAs from 'file-saver';

const zip = new JSZip();
let parser = new DOMParser();

let template = {};
let unsubscribeProject;
let unsubscribeChapters;
let unsubscribeScenes;

export class Export {
    constructor(id, img, author) {
        this.projectId = id;
        this.projectImage = img;
        this.projectAuthor = author;
        this.templateFiles = {
            files: [{
                name: "container",
                path: "templates/moby-dick/META-INF/container.xml"
            }, {
                name: "package",
                path: "templates/moby-dick/OPS/package.opf"
            }, {
                name: "toc",
                path: "templates/moby-dick/OPS/toc.xhtml"
            }, {
                name: "content",
                path: "templates/moby-dick/OPS/chapter.xhtml"
            }, {
                name: "titlepage",
                path: "templates/moby-dick/OPS/titlepage.xhtml"
            }, {
                name: "cover",
                path: "templates/moby-dick/OPS/cover.xhtml"
            }],
            fonts: [
                "OPS/fonts/STIXGeneral.otf",
                "OPS/fonts/STIXGeneralBol.otf",
                "OPS/fonts/STIXGeneralBolIta.otf",
                "OPS/fonts/STIXGeneralItalic.otf",
                "OPS/css/stylesheet.css"
            ]
        };
    }

    async fetchTemplate() {
        unsubscribeProject = await projects.subscribe(value => {
            value.filter(e => e.id == this.projectId).forEach(project => {
                this.projectData = project;
            })
        });
        const start = async () => {
            this.asyncForEach(this.templateFiles.files, async (t) => {
                    const response = await fetch(t.path);
                    template[t.name] = parser.parseFromString(await response.text(), "text/xml");
                }).then(() => {
                    // set project title
                    console.log(template)
                    template.content.getElementById("title").textContent =
                        template.cover.getElementById("title").textContent =
                        template.titlepage.getElementById("title").textContent =
                        template.toc.getElementById("title").textContent =
                        template.toc.getElementById("toc-title").textContent =
                        template.package.getElementById("title").textContent = this.projectData.title;
                    // set author
                    template.package.getElementById("creator").textContent = this.projectAuthor;
                }).then(() => {
                    // create chapters
                    unsubscribeChapters = chapters.subscribe(value => {
                        value.filter(e => e.project == this.projectId).sort(this.compare).forEach((element, i) => {

                            let chapterTemplate = template.content.cloneNode(true);
                            chapterTemplate.getElementById("CHAPTER_TITLE").textContent = element.title;

                            // add to nav
                            let tocTemplateBefore = template.toc.getElementById("CHAPTER_LOOP");
                            let tocTemplate = template.toc.getElementById("CHAPTER_LOOP").cloneNode(true);
                            tocTemplate.id = "chapter_" + this.zeroPad((i + 1));
                            tocTemplate.firstElementChild.href = "chapter_" + this.zeroPad((i + 1)) + ".xhtml";
                            tocTemplate.firstElementChild.textContent = element.title;
                            tocTemplateBefore.parentNode.insertBefore(tocTemplate, tocTemplateBefore);

                            // add to package
                            let packageTocBefore = template.package.getElementById("CHAPTER_LOOP");
                            let packageToc = template.package.getElementById("CHAPTER_LOOP").cloneNode(true);
                            packageToc.id = "chapter_" + this.zeroPad((i + 1));
                            packageToc.attributes[1].value = "chapter_" + this.zeroPad((i + 1)) + ".xhtml";
                            packageTocBefore.parentNode.insertBefore(packageToc, packageTocBefore);

                            // add to spine
                            let packageSpineBefore = template.package.getElementById("SPINE_CHAPTER_LOOP");
                            let packageSpine = template.package.getElementById("SPINE_CHAPTER_LOOP").cloneNode(true);
                            packageSpine.id = "chapter_spine_" + this.zeroPad((i + 1));
                            packageSpine.attributes[1].value = "chapter_" + this.zeroPad((i + 1));
                            packageSpineBefore.parentNode.insertBefore(packageSpine, packageSpineBefore);

                            unsubscribeScenes = scenes.subscribe(value => {
                                value.filter(e => e.chapter == element.id).sort(this.compare).forEach((scene, i) => {
                                    scene.content.blocks.forEach((block, j) => {
                                        let blockTemplateBefore = chapterTemplate.getElementById("BLOCK");
                                        let blockTemplate = chapterTemplate.getElementById("BLOCK").cloneNode(true);
                                        blockTemplate.id = "block_" + i + "_" + j;
                                        blockTemplate.textContent = block.data.text;
                                        blockTemplateBefore.parentNode.insertBefore(blockTemplate, blockTemplateBefore);
                                    })
                                });

                            });
                            zip.file("OPS/chapter_" + this.zeroPad((i + 1), 3) + ".xhtml", chapterTemplate.children[0].outerHTML);
                        });
                    });
                })
                .then(() => {
                    const removeElements = (elms) => elms.forEach(el => el.remove());
                    removeElements(template.content.querySelectorAll("#BLOCK"));
                    removeElements(template.toc.querySelectorAll("#CHAPTER_LOOP"));
                    removeElements(template.package.querySelectorAll("#CHAPTER_LOOP"));
                    removeElements(template.package.querySelectorAll("#SPINE_CHAPTER_LOOP"));

                    // create files
                    zip.file("mimetype", "application/epub+zip");
                    zip.file("OPS/package.opf", template.package.children[0].outerHTML);
                    zip.file("OPS/toc.xhtml", template.toc.children[0].outerHTML);
                    zip.file("OPS/cover.xhtml", template.cover.children[0].outerHTML);
                    zip.file("OPS/titlepage.xhtml", template.titlepage.children[0].outerHTML);
                    zip.file("OPS/images/cover.jpg", this.projectImage, {
                        binary: true
                    });
                    zip.file("META-INF/container.xml", template.container.children[0].outerHTML);
                    this.templateFiles.files.forEach(e => {
                        fetch("templates/moby-dick/" + e)
                            .then(res => res.arrayBuffer())
                            .then(ab => {
                                zip.file(name, ab);
                            })
                    })
                }).then(() => {
                    // generate zip file and save
                    zip.generateAsync({
                        type: "blob"
                    }).then(blob => {
                        saveAs.saveAs(blob, this.projectData.title + ".epub");
                    }, err => {
                        window.alert("error: " + err);
                    });
                }).then(() => {
                    // clean up
                    unsubscribeProject();
                    unsubscribeChapters();
                    unsubscribeScenes();
                })
        }
        return start();
    }
    async asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
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
    zeroPad(num) {
        return String(num).padStart(3, '0')
    }
}