import Backendless from "backendless";
import {
    state
} from "./stores";

const APP_ID = "__api_id__";
const API_KEY = "__api_key__";
const API_URL = "https://backendlessappcontent.com/" + APP_ID + "/" + API_KEY + "/files/userData/";
let USER_ID;
let USER_TOKEN;

state.subscribe(value => {
    USER_ID = value.currentUser;
    USER_TOKEN = value.currentUserToken;
});

Backendless.serverURL = "https://api.backendless.com";
Backendless.initApp(APP_ID, API_KEY);

const cloud = {
    /**
     * Registers new user.
     * @returns Backendless.User
     */
    register: (name, email, pass) => {
        let user = new Backendless.User();
        user.email = email;
        user.password = pass;
        user.name = name;
        return Backendless.UserService.register(user);
    },
    /**
     * Checks if user is logged in.
     * @returns Promise<boolean>
     */
    isUserLoggedIn: () => {
        return Backendless.UserService.isValidLogin()
            .then((retValue) => {
                return retValue;
            })
            .catch(error)
    },
    isValidLogin: () => {
        return Backendless.UserService.isValidLoginSync();
    },
    /**
     * Login user and sets user ID in state.
     * @param user E-Mail
     * @param pass Password
     */
    login: (user, pass) => {
        return Backendless.UserService.login(user, pass, true);
    },
    /**
     * Logs out user.
     */
    logout: () => {
        return Backendless.UserService.logout()
            .then(() => {
                state.setCurrentUser(null, null, null);
            })
            .catch(error)
    },
    setCloudTimestamp: () => {
        return Backendless.Files.listing("userData/" + USER_ID, "data.json", false)
            .then((fileInfoArray) => {
                state.updateCloudTimestamp(fileInfoArray[0].createdOn);
            })
    },
    /**
     * Saves all stores into cloud.
     * @returns Promise<boolean>
     */
    saveToCloud: () => {
        let blob = new Blob(["\ufeff", JSON.stringify(localStorage)], {
            type: "application/json"
        });

        return Backendless.Files.saveFile("userData/" + USER_ID, "data.json", blob, true)
            .then(() => {
                cloud.setCloudTimestamp();
                return true;
            })
            .catch(error);
    },
    /**
     * Fetches all stores from cloud.
     * @returns Promise<boolean>
     */
    saveFromCloud: async () => {
        const response = await fetch(API_URL + USER_ID + "/data.json", {
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
        });
    }
}

export default cloud;

function error(error) {
    console.log(error.message);
    console.log(error.statusCode);
}