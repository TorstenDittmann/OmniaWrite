export const isRunningElectron = window && window.process && window.process.type;
const { ipcRenderer } = isRunningElectron ? window.require("electron") : {};

class Deskgap {
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

export const deskgap = new Deskgap();

export function checkRequirements() {
    let check = {
        steps: {
            internet: false,
            browser: false,
            serviceWorker: false
        },
        installable: false
    }

    check.steps.internet = navigator.onLine;

    // Chrome 1 - 71
    let isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
    // webKit

    if (isChrome) check.steps.browser = true;
    if ("serviceWorker" in navigator) check.steps.serviceWorker = true;

    if (check.steps.browser) check.installable = true;

    return check;
}

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