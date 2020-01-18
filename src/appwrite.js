import * as Appwrite from "appwrite";
import {
    state
} from "./stores";

const APP_ENDPOINT = "http://9680b3e.online-server.cloud/v1";
const APP_PROJECT = "5e206befb11db";
const APP_HOST = "http://localhost:5000"

const SDK = new window.Appwrite();

SDK.setEndpoint(APP_ENDPOINT).setProject(APP_PROJECT);

const cloud = {
    currentUser: "5e2343da0c514",
    /**
     * Registers new user.
     * @returns Backendless.User
     */
    register: (name, email, pass) => {
        SDK.auth.register(
            email,
            pass,
            "http://localhost:5000/#/cloud/confirm/",
            "http://localhost:5000/#/cloud/success/", // required for JS SDK
            "http://localhost:5000/#/cloud/failure/", // required for JS SDK
            name
        );
    },
    /**
     * Checks if user is logged in.
     * @returns Promise<boolean>
     */
    isUserLoggedIn: () => {
        return SDK.account.get();
    },
    recoverPassword: (user) => {
        return SDK.auth.recovery(
            user,
            "http://localhost:5000/#/cloud/recovery/"
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
        SDK.auth.login(
            user,
            pass,
            "http://localhost:5000/#/cloud/success/", // required for JS SDK
            "http://localhost:5000/#/cloud/failure/" // required for JS SDK
        );
    },
    /**
     * Logs out user.
     */
    logout: () => {
        return SDK.auth.logout();
    },
    setCloudTimestamp: () => {
        /*return Backendless.Files.listing("userData/" + USER_ID, "data.json", false)
            .then((fileInfoArray) => {
                state.updateCloudTimestamp(fileInfoArray[0].createdOn);
            })*/
    },
    /**
     * Saves all stores into cloud.
     * @returns Promise<boolean>
     */
    saveToCloud: () => {
        let blob = new Blob(["\ufeff", JSON.stringify(localStorage)], {
            type: "application/json"
        });

        return SDK.storage.createFile(new File([blob], "user:" + cloud.currentUser + ".json"), ["user:" + cloud.currentUser], ["user:" + cloud.currentUser], "user:" + cloud.currentUser);
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
    }
}

export default cloud;