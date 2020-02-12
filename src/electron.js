/* eslint-disable no-undef */
const { app, BrowserWindow } = require("electron");
const path = require("path")
const ipc = require("electron").ipcMain


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    frame: false,
    icon: path.join(__dirname, "../build/icon.png"),
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadURL(`file://${path.join(__dirname, "../public/index.html")}`);
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.allowRendererProcessReuse = true;
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

ipc.on("reload", () => {
  mainWindow.reload();
});

ipc.on("minimize", () => {
  mainWindow.minimize();
});

ipc.on("maximize", () => {
  mainWindow.maximize();
});

ipc.on("restore", () => {
  mainWindow.restore();
});

ipc.on("close", () => {
  mainWindow.close();
});

ipc.on("resize", () => {
  if (mainWindow.isMaximized()) {
    mainWindow.restore();
  } else {
    mainWindow.maximize();
  }
})