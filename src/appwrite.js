import Appwrite from "appwrite";
import {
    state
} from "./stores";

const APP_ENDPOINT = "https://shelf.omniawrite.com/v1";
const APP_PROJECT = "5e49446bb5328";
const APP_HOST = window.location.origin + "/";

const SDK = new Appwrite();

SDK.setEndpoint(APP_ENDPOINT).setProject(APP_PROJECT);

const cloud = {
    currentUser: null,
    /**
     * Registers new user.
     * @returns Backendless.User
     */
    register: (name, email, pass) => {
        SDK.auth.register(
            email,
            pass,
            APP_HOST + "#/cloud/register-confirm/",
            APP_HOST + "#/cloud/register-success/",
            APP_HOST + "#/cloud/register-failure/",
            name
        );
    },
    /**
     * Checks if user is logged in.
     * @returns Promise<boolean>
     */
    isUserLoggedIn: async () => {
        return SDK.account.get().then(account => {
            cloud.currentUser = account.$uid;
            return account;
        });
    },
    recoverPassword: (user) => {
        return SDK.auth.recovery(
            user,
            APP_HOST + "#/cloud/recovery/"
        );
    },
    confirm: (id, token) => {
        return SDK.auth.confirm(id, token);
    },
    /**
     * Login user and sets user ID in state.
     * @param user E-Mail
     * @param pass Password
     */
    login: (user, pass) => {
        return SDK.auth.login(
            user,
            pass,
            APP_HOST + "#/cloud/login-success/",
            APP_HOST + "#/cloud/login-failure/"
        );
    },
    /**
     * Logs out user.
     */
    logout: () => {
        return SDK.auth.logout();
    },
    /**
     * Logs out session form user.
     */
    logoutSession: (id) => {
        return SDK.auth.logoutBySession(id);
    },
    setCloudTimestamp: (id) => {
        return SDK.storage.getFile(id).then(response => {
            state.updateCloudTimestamp(response.dateCreated);
        });
    },
    /**
     * Saves all stores into cloud.
     * @returns Promise<boolean>
     */
    saveToCloud: () => {
        let blob = new Blob(["\ufeff", JSON.stringify(localStorage)], {
            type: "application/json"
        });

        return SDK.storage.createFile(
            new File([blob], "user:" + cloud.currentUser + ".json"),
            ["user:" + cloud.currentUser],
            ["user:" + cloud.currentUser],
            "user:" + cloud.currentUser).then(response => {
                state.updateCloudTimestamp(response[0].dateCreated);
                return response;
            });
    },
    /**
     * Fetches all stores from cloud.
     * @returns Promise<boolean>
     */
    saveFromCloud: async () => {
        /*const response = await fetch(API_URL + USER_ID + "/data.json", {
            headers: {
                "user-token": USER_TOKEN
            }
        });
        const data = await response.json();
        const dataObject = Object.keys(data);
        return new Promise((resolve) => {
            dataObject.forEach(k => {
                if (k != "Backendless") {
                    localStorage.setItem(k, data[k]);
                }
            });
            cloud.setCloudTimestamp().then(() => {
                resolve(true);
            });
        });*/
    },
    getSecurityLog: () => {
        return SDK.account.getSecurity();
    },
    getSessions: () => {
        return SDK.account.getSessions();
    },
    createCollection: (name) => {
        return SDK.database.createCollection(name, ["user:" + cloud.currentUser], ["user:" + cloud.currentUser], []);
    },
    uploadSettings: () => {
        return SDK.account.updatePrefs(JSON.parse(localStorage.getItem("settings")))
    },
    deleteSettings: () => {
        SDK.account.updatePrefs({}).then(
            response => {
                console.log(response);
            }, error => {
                console.log(error)
            });
    },
    getSettings: () => {
        return SDK.account.getPrefs()
    },
    restoreBackup: (id) => {
        return SDK.storage.getFileDownload(id).then(response => {
            const data = JSON.parse(response);
            const dataObject = Object.keys(data);
            return new Promise((resolve) => {
                dataObject.forEach(k => localStorage.setItem(k, data[k]));
                cloud.setCloudTimestamp(id).then(() => resolve(true));
            });
        })
    },
    getAllBackups: () => {
        return SDK.storage.listFiles("user:" + cloud.currentUser + ".json", 25, 0, "DESC");
    },
    getLatestBackup: () => {
        return SDK.storage.listFiles("", 1, 0, "DESC").then(response => {
            console.log(response);
        })
    }
}

export default cloud;