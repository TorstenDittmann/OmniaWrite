import Backendless from 'backendless';
import {
    state
} from "./stores";

const APP_ID = '0CE45A1E-07A9-86CD-FF78-81FCFD46CD00';
const API_KEY = '5990F07B-D5AA-70CF-FF93-AD29940B8900';
const API_URL = 'https://backendlessappcontent.com/' + APP_ID + '/' + API_KEY + '/files/userData/';
let USER_ID;

state.subscribe(value => {
    USER_ID = value.currentUser;
});

Backendless.serverURL = 'https://api.backendless.com';
Backendless.initApp(APP_ID, API_KEY);

export const cloud = {
    register: (name, email, pass) => {
        let user = new Backendless.User();
        user.email = email;
        user.password = pass;
        user.name = name;
        return Backendless.UserService.register(user)
            .then((registeredUser) => {
                return registeredUser;
            })
            .catch(error)
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
    /**
     * Login user and sets user ID in state.
     * @param user E-Mail
     * @param pass Password
     */
    login: (user, pass) => {
        return Backendless.UserService.login(user, pass, true)
            .then((loggedInUser) => {
                state.setCurrentUser(loggedInUser.objectId);
            })
            .catch(error)
    },
    /**
     * Logs out user.
     */
    logout: () => {
        return Backendless.UserService.logout()
            .then(() => {
                state.setCurrentUser(null);
            })
            .catch(error)
    },
    /**
     * Saves all stores into cloud.
     * @returns Promise<boolean>
     */
    saveToCloud: () => {
        let blob = new Blob(["\ufeff", JSON.stringify(localStorage)], {
            type: 'application/json'
        });

        return Backendless.Files.saveFile("userData", USER_ID + ".txt", blob, true)
            .then(() => {
                state.updateCloudTimestamp();
                return true;
            })
            .catch(error);
    },
    /**
     * Fetches all stores from cloud.
     * @returns Promise<boolean>
     */
    saveFromCloud: async () => {
        const response = await fetch(API_URL + USER_ID + '.txt');
        const data = await response.json();
        const dataObject = Object.keys(data);
        return new Promise((resolve, reject) => {
            dataObject.forEach((k, i) => {
                localStorage.setItem(k, data[k]);
                if (i + 1 == dataObject.length) {
                    resolve(true)
                }
            });
        });
    }
}

function error(error) {
    console.log(error.message);
    console.log(error.statusCode);
}