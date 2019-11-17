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
let data = {};

async function fetchTemplate() {
    const start = async () => {
        asyncForEach(templateFiles, async (t) => {
            const response = await fetch(t.path);
            template[t.name] = parser.parseFromString(await response.text(), "text/xml");
        }).then(() => {
            // set project title
            template.content.getElementById("_title").textContent = "Titel";
            template.package.getElementById("_title").textContent = "Titel";
            // set author
            template.package.getElementById("_author").textContent = "Torsten Dittmann";
        }).then(() => {
            // create chapters
        }).then(() => {
            // create scenes
        }).then(() => {
            // create files
            zip.file("mimetype", "application/epub+zip");
            zip.file("EPUB/package.opf", template.package.children[0].outerHTML);
            zip.file("EPUB/nav.opf", template.nav.children[0].outerHTML);
            zip.file("EPUB/content.opf", template.content.children[0].outerHTML);
            zip.file("EPUB/css/epub.css", template.epub.children[0].outerHTML);
        }).then(() => {
            // generate zip file and save
            zip.generateAsync({
                type: "blob"
            }).then(blob => {
                saveAs.saveAs(blob, "hello-world.epub");
            }, err => {
                window.alert("error: " + err);
            });
        })
    }
    return start();
}

async function fetchData() {

}

export async function generateDownload() {
    data = await fetchData();
    fetchTemplate();
}
async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}