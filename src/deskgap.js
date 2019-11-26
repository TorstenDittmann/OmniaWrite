const {
    app,
    BrowserWindow,
    messageNode
} = require("deskgap");


app.once("ready", () => {
    messageNode.on("minimize", () => win.minimize());
    messageNode.on("maximize", () => win.maximize());
    messageNode.on("restore", () => void(0));
    messageNode.on("close", () => win.close());

    let win = new BrowserWindow({
        height: 900,
        width: 1600,
        frame: false,
        menu: null,
        resizable: true
    });
    win.loadFile("public/index.html");
    win.on("closed", () => {
        win = null;
    });
});