import {
    projects,
    chapters,
    scenes
} from "./stores";
import JSZip from 'jszip';
import saveAs from 'file-saver';


const zip = new JSZip();
let parser = new DOMParser();
const templateFiles = [{
    name: "container",
    path: "templates/default/META-INF/container.xml"
}, {
    name: "package",
    path: "templates/default/EPUB/package.opf"
}, {
    name: "nav",
    path: "templates/default/EPUB/nav.xhtml"
}, {
    name: "content",
    path: "templates/default/EPUB/content.xhtml"
}, {
    name: "epub",
    path: "templates/default/EPUB/css/epub.css"
}];

let template = {};
let projectId;
let projectImage;
let projectData;

async function fetchTemplate() {
    const start = async () => {
        asyncForEach(templateFiles, async (t) => {
            const response = await fetch(t.path);
            template[t.name] = parser.parseFromString(await response.text(), "text/xml");
        }).then(() => {
            // set project title
            template.content.getElementById("_title").textContent = projectData.title;
            template.package.getElementById("_title").textContent = projectData.title;
            // set author
            template.package.getElementById("_author").textContent = "Torsten Dittmann";
        }).then(() => {
            // create chapters
            chapters.subscribe(value => {
                value.filter(e => e.project == projectId).sort(compare).forEach(element => {
                    let chapterTemplate = template.content.getElementById("CHAPTER_ID").cloneNode(true);
                    chapterTemplate.id = "chapter" + element.id;
                    chapterTemplate.innerHTML = chapterTemplate.innerHTML.replace("CHAPTER_TITLE", element.title);

                    template.content.getElementById("_body").appendChild(chapterTemplate);

                    // add to nav
                    let navTemplate = template.nav.getElementById("NAV").cloneNode(true);
                    navTemplate.id = element.id;
                    navTemplate.firstElementChild.href = "content.xhtml#chapter" + element.id;
                    navTemplate.firstElementChild.textContent = element.title;
                    template.nav.getElementById("_list").appendChild(navTemplate);
                    scenes.subscribe(value => {
                        value.filter(e => e.chapter == element.id).sort(compare).forEach(scene => {
                            let sceneTemplate = template.content.getElementById("SCENE_ID").cloneNode(true);

                            sceneTemplate.id = "scene" + scene.id;
                            sceneTemplate.innerHTML = sceneTemplate.innerHTML.replace("SCENE_TITLE", scene.title);
                            template.content.getElementById("chapter" + element.id).appendChild(sceneTemplate);

                            scene.content.blocks.forEach((block, i) => {
                                let blockTemplate = template.content.getElementById("BLOCK_ID").cloneNode(true);
                                blockTemplate.id = "block" + i;
                                blockTemplate.textContent = block.data.text;
                                template.content.getElementById("scene" + scene.id).appendChild(blockTemplate);
                            })
                        });

                    });
                });
            });
        }).then(() => {
            const removeElements = (elms) => elms.forEach(el => el.remove());
            removeElements(template.content.querySelectorAll("#BLOCK_ID"));
            removeElements(template.content.querySelectorAll("#SCENE_ID"));
            removeElements(template.content.querySelectorAll("#CHAPTER_ID"));
            removeElements(template.nav.querySelectorAll("#NAV"));

            // create files
            zip.file("mimetype", "application/epub+zip");
            zip.file("EPUB/package.opf", template.package.children[0].outerHTML);
            zip.file("EPUB/nav.xhtml", template.nav.children[0].outerHTML);
            zip.file("EPUB/content.xhtml", template.content.children[0].outerHTML);
            zip.file("EPUB/css/epub.css", template.epub.children[0].outerHTML);
            zip.file("EPUB/images/cover.png", projectImage, {
                binary: true
            });
            zip.file("META-INF/container.xml", template.container.children[0].outerHTML);
        }).then(() => {
            // generate zip file and save
            zip.generateAsync({
                type: "blob"
            }).then(blob => {
                saveAs.saveAs(blob, projectData.title + ".epub");
            }, err => {
                window.alert("error: " + err);
            });
        })
    }
    return start();
}

export async function generateDownload(id, img) {
    projectId = id;
    projectImage = img;
    await projects.subscribe(value => {
        value.filter(e => e.id == id).forEach(project => {
            projectData = project;
        })
    });
    await fetchTemplate();
}
async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

function compare(a, b) {
    if (a.order < b.order) {
        return -1;
    }
    if (a.order > b.order) {
        return 1;
    }
    return 0;
}