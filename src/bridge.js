import saveAs from "file-saver";
import { Plugins, FilesystemDirectory } from "@capacitor/core";
import { getBase64 } from "./utils";

export const isRunningCapacitor = window && window.Capacitor && window.Capacitor.isNative;
export const isRunningElectron = window && window.process && window.process.type;

const { ipcRenderer } = isRunningElectron ? window.require("electron") : {};
const { Filesystem } = Plugins;

export const reloadWindow = () => isRunningElectron ? ipcRenderer.send("reload") : window.location.reload();
export const closeWindow = () => ipcRenderer.send("close");
export const resizeWindow = () => ipcRenderer.send("resize");
export const minimizeWindow = () => ipcRenderer.send("minimize");

export const saveFile = async (blob, filename) => {
  try {
    if (!isRunningCapacitor) {
      return {
        type: "download",
        download: () => {
          saveAs.saveAs(blob, filename);
        }
      }
    }
    await prepareDirectory("OmniaWrite");
    const result = await Filesystem.writeFile({
      path: `OmniaWrite/${filename}`,
      data: await getBase64(blob),
      directory: FilesystemDirectory.Documents
    })
    return {
      type: "filesystem",
      uri: result.uri
    }
  } catch (e) {
    throw Error("Unable to write file");
  }
}

const prepareDirectory = async (name) => {
  try {
    return await Filesystem.mkdir({
      path: name,
      directory: FilesystemDirectory.Documents,
      recursive: true
    });
  } catch (error) {
    if (error.message == "Directory exists") {
      return false;
    }
    console.error(error);
  }
}