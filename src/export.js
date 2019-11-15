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
        await asyncForEach(templateFiles, async (t) => {
            const response = await fetch(t.path);
            template[t.name] = parser.parseFromString(await response.text(), "text/xml");
        }).then(() => {
            // set project title
            template.content.getElementById("_title").text = "Titel";
            template.package.children[0].children[0].children[0].textContent = "Titel";
        }).then(() => {

        });
    }
    return start();
}

export function generateDownload() {
    fetchTemplate().then(() => {
        console.log(template)
    });
    /*zip.file("mimetype", "application/epub+zip");

    zip.file("nested/hello.txt", "Hello World\n");

    zip.generateAsync({
        type: "blob"
    }).then(blob => {
        saveAs.saveAs(blob, "hello-world.epub");
    }, err => {
        window.alert("error");
    });*/
}
async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}