/* eslint-disable no-undef */
const { app, dialog, shell, BrowserWindow } = require("electron");

const path = require("path");
const fetch = require("node-fetch");
const semver = require("semver");
const ipc = require("electron").ipcMain;


let mainWindow;
let loadingScreen;

const windowHandler = {
  set(target, key, value) {
    if (key === "main" && value) {
      showMainWindow();
    }
    target[key] = value;
  }
};
const windowState = new Proxy({ main: false }, windowHandler);

console.log("App starting...");

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 720,
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
    if (windowState.main) {
      mainWindow.show();
    }
  });
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

const showMainWindow = () => {
  console.log("Show app");
  if (loadingScreen) {
    loadingScreen.close();
  }
  mainWindow.show();
}

const createLoadingScreen = () => {
  loadingScreen = new BrowserWindow(
    Object.assign({
      width: 300,
      height: 400,
      frame: false,
      transparent: true,
      resizable: false
    })
  );
  loadingScreen.loadURL(`file://${path.join(__dirname, "../public/splash/index.html")}`);

  loadingScreen.on("closed", () => (loadingScreen = null));
  loadingScreen.webContents.on("did-finish-load", () => {
    console.log("Show loading screen");
    loadingScreen.show();
    let status = false;
    let latest = false;
    fetch("https://api.github.com/repos/torstendittmann/omniawrite/releases/latest")
      .then(response => {
        status = response.status;
        return response.json();
      })
      .then(data => {
        latest = data;
      })
      .catch(err => console.log(err))
      .finally(() => {
        let currentVersion = app.getVersion();
        let fetchedVersion = latest ? latest.name : false;

        if (status && status === 200 && fetchedVersion && semver.gt(fetchedVersion, currentVersion)) {
          let options = {
            buttons: ["Yes", "No"],
            title: "Update available!",
            message: "There is a new Update available!\n\nWould you like to update now?",
            type: "info"
          };
          dialog.showMessageBox(options).then(res => {
            if (res.response === 0) {
              shell.openExternal("https://omniawrite.com/download")
            }
            windowState.main = true;
          })
        } else {
          windowState.main = true;
        }
      });
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
