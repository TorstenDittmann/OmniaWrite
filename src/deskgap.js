/* eslint-disable no-undef */
let {
    app,
    BrowserWindow,
    messageNode,
    dialog
} = require("deskgap");

let fs = require("fs");
let win;

app.once("ready", () => {
    messageNode.on("reload", () => {
        win.reload();
    });
    messageNode.on("minimize", () => win.minimize());
    messageNode.on("restore", () => void (0));
    messageNode.on("close", () => win.close());
    messageNode.on("saveFile", (browserWindow, content, fileName) => {
        dialog.showSaveDialogAsync(win, {
            "defaultPath": fileName
        }).then((e) => {
            try {
                fs.writeFileSync(e.filePath, content, "base64");
            } catch (e) {
                alert("Failed to save the file !");
            }
        })
    });

    win = new BrowserWindow({
        frame: false,
        menu: null,
        show: false,
        width: 1280,
        height: 960,
        icon: "public/apple-touch-icon.png"
    }).once("ready-to-show", () => {
        win.show();
    });

    if (process.platform !== "win32") {
        win.webView.setDevToolsEnabled(true);
    }

    win.loadFile("public/index.html");
    win.on("closed", () => {
        win = null;
    });
});