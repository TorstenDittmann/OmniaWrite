import { saveAs } from "file-saver";

export const isRunningCapacitor = window && window.Capacitor;
export const isRunningElectron = window && window.process && window.process.type;

const { ipcRenderer } = isRunningElectron ? window.require("electron") : {};

export const reloadWindow = () => isRunningElectron ? ipcRenderer.send("reload") : window.location.reload();
export const closeWindow = () => ipcRenderer.send("close");
export const resizeWindow = () => ipcRenderer.send("resize");
export const minimizeWindow = () => ipcRenderer.send("minimize");

export const saveFile = (blob, filename) => {
  return {
    type: "download",
    download: () => {
      saveAs(blob, filename);
    }
  }
}