const {
    app,
    BrowserWindow,
    messageNode,
    asyncNode,
    dialog
} = require("deskgap");

const fs = require('fs');
let win;

app.once("ready", () => {
    messageNode.on("minimize", () => win.minimize());
    messageNode.on("maximize", () => win.maximize());
    messageNode.on("restore", () => void(0));
    messageNode.on("close", () => win.close());
    messageNode.on("saveFile", (d, content) => {
        dialog.showSaveDialogAsync(win, {}).then((e) => {
            try {
                fs.writeFileSync(e.filePath, content, 'utf-8');
            } catch (e) {
                alert('Failed to save the file !');
            }
        })

    })

    win = new BrowserWindow({
        height: 900,
        width: 1600,
        frame: false,
        menu: null,
        show: false
    }).once('ready-to-show', () => {
        win.show();
    });;

    if (process.platform !== 'win32') {
        win.webView.setDevToolsEnabled(true);
    }

    win.loadFile("public/index.html");
    win.on("closed", () => {
        win = null;
    });
});