import Appwrite from "appwrite";
import {
    state
} from "./stores";

const APP_ENDPOINT = "https://shelf.omniawrite.com/v1";
const APP_PROJECT = "5e776e77a0bf6";
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
        return SDK.account.create(
            email,
            pass,
            name
        );
    },
    createConfirmation: () => {
        return SDK.account.createVerification(APP_HOST + "#/cloud/register-confirm/");
    },
    /**
     * Checks if user is logged in.
     * @returns Promise<boolean>
     */
    isUserLoggedIn: async () => {
        return SDK.account.get().then(account => {
            cloud.currentUser = account.$id;
            return account;
        });
    },
    /**
     * Checks if user is logged in.
     * @returns Promise<boolean>
     */
    getUser: () => {
        return SDK.account.get();
    },
    recoverPassword: (user) => {
        return SDK.auth.recovery(
            user,
            APP_HOST + "#/cloud/recovery/"
        );
    },
    confirm: (id, token) => {
        return SDK.account.updateVerification(id, token);
    },
    /**
     * Login user and sets user ID in state.
     * @param user E-Mail
     * @param pass Password
     */
    login: (user, pass) => {
        return SDK.account.createSession(
            user,
            pass
        );
    },
    /**
     * Logs out session form user.
     */
    logoutSession: (id) => {
        return SDK.account.deleteSession(id);
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
            new File([blob], `user:${cloud.currentUser}.json`),
            [`user:${cloud.currentUser}`],
            [`user:${cloud.currentUser}`]
        ).then(response => {
            state.updateCloudTimestamp(response.dateCreated);
            return response;
        }, error => {
            console.log(error);
        });
    },
    getSecurityLog: () => {
        return SDK.account.getLogs();
    },
    getSessions: () => {
        return SDK.account.getSessions().then(res => {
            console.log(res);
            return res;
        });
    },
    restoreBackup: (id) => {
        return fetch(SDK.storage.getFileView(id))
            .then((response) => {
                return response.json();
            })
            .then(response => {
                const data = response;
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
        return SDK.storage.listFiles("", 1, 0, "DESC");
    },
    updateEmail: (mail, pass) => {
        return SDK.account.updateEmail(mail, pass);
    },
    updateName: (name) => {
        return SDK.account.updateName(name);
    },
    updatePassword: (pass, old) => {
        return SDK.account.updatePassword(pass, old);
    }
}

export default cloud;