const {
    messageUI
} = window.deskgap || {};
const isElectron = true;
const { ipcRenderer } = isElectron ? require('electron') : undefined;

class Deskgap {
    isRunning() {
        return typeof navigator === "object" && typeof navigator.userAgent === "string" && navigator.userAgent.indexOf("Electron");
    }

    reload() {
        return window.deskgap ? messageUI.send("reload") : window.location.reload();
    }

    closeWindow() {
        messageUI.send("close");
    }

    minimizeWindow() {
        ipcRenderer.send("maximize");
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