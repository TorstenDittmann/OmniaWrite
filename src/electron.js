/* eslint-disable no-undef */
const { app, BrowserWindow } = require("electron");
const { autoUpdater } = require("electron-updater")

const path = require("path")
const ipc = require("electron").ipcMain


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let loadingScreen;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    frame: false,
    title: "OmniaWrite",
    show: false,
    icon: path.join(__dirname, "../build/icon.png"),
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadURL(`file://${path.join(__dirname, "../public/index.html")}`);
  mainWindow.webContents.on("did-finish-load", () => {
    /// then close the loading screen window and show the main window
    if (loadingScreen) {
      loadingScreen.close();
    }
    mainWindow.show();
  });
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

const createLoadingScreen = () => {
  /// create a browser window
  loadingScreen = new BrowserWindow(
    Object.assign({
      /// define width and height for the window
      width: 300,
      height: 400,
      /// remove the window frame, so it will become a frameless window
      frame: false,
      /// and set the transparency, to remove any window background color
      transparent: true,
      resizable: false
    })
  );
  loadingScreen.loadURL(`file://${path.join(__dirname, "../public/splash/index.html")}`);

  loadingScreen.on("closed", () => (loadingScreen = null));
  loadingScreen.webContents.on("did-finish-load", () => {
    loadingScreen.show();
    autoUpdater.checkForUpdatesAndNotify();
  });
};

app.allowRendererProcessReuse = true;
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  createLoadingScreen();
  createWindow();
});

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