/* eslint-disable no-undef */
const {
    app,
    BrowserWindow,
    messageNode,
    dialog
} = require("deskgap");

const fs = require("fs");
let win;

app.once("ready", () => {
    messageNode.on("minimize", () => win.minimize());
    messageNode.on("restore", () => void(0));
    messageNode.on("close", () => win.close());
    messageNode.on("saveFile", (d, content) => {
        dialog.showSaveDialogAsync(win, {}).then((e) => {
            try {
                fs.writeFileSync(e.filePath, content, "utf-8");
            } catch (e) {
                alert("Failed to save the file !");
            }
        })

    })

    win = new BrowserWindow({
        frame: false,
        menu: null,
        show: false,
        resizable: true
    }).once("ready-to-show", () => {
        win.show();
    });

    win.loadFile("public/index.html");
    win.on("closed", () => {
        win = null;
    });
});