export const isRunningElectron = window && window.process && window.process.type;
const { ipcRenderer } = isRunningElectron ? window.require("electron") : {};

class ElectronIPC {
    reload() {
        return isRunningElectron ? ipcRenderer.send("reload") : window.location.reload();
    }

    closeWindow() {
        ipcRenderer.send("close");
    }

    resizeWindow() {
        ipcRenderer.send("resize");
    }

    minimizeWindow() {
        ipcRenderer.send("minimize");
    }
}

export const electronIPC = new ElectronIPC();

export const getRandomNumber = () => {
    return Math.floor(Math.random() * 999999);
}

export const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });