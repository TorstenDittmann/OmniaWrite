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

    // Firefox 1.0+
    let isFirefox = typeof InstallTrigger !== "undefined";
    // Chrome 1 - 71
    let isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
    // webKit
    let isWebKit = !!window.webkitURL;


    if (isChrome || isFirefox || isWebKit) check.steps.browser = true;
    if ("serviceWorker" in navigator) check.steps.serviceWorker = true;

    if (check.steps.browser) check.installable = true;

    return check;
}