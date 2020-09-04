import Appwrite from "appwrite";
import { get } from "svelte/store";
import { state, settings } from "./stores";

const APP_ENDPOINT = "https://shelf.omniawrite.com/v1";
const APP_PROJECT = "5e890a780e6b2";
const APP_EXT_HOST = "https://external.omniawrite.com/";

const SDK = new Appwrite();

SDK.setEndpoint(APP_ENDPOINT)
  .setProject(APP_PROJECT)
  .setLocale(get(settings).language || "en");

const cloud = {
  currentUser: null,
  /**
   * Registers new user.
   * @param {string} name Fullname of the user.
   * @param {string} email E-mail of the user.
   * @param {string} pass Password of the user.
   * @returns Promise<user>
   */
  register: (name, email, pass) => {
    return SDK.account.create(email, pass, name);
  },
  /**
   * Send verify email to user.
   * @returns Promise<response>
   */
  createConfirmation: () => {
    return SDK.account.createVerification(APP_EXT_HOST + "#/verify-account");
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
  /**
   * Send password recovery email.
   * @param {string} mail Email of user.
   * @returns Promise<repsonse>
   */
  recoverPassword: mail => {
    return SDK.account.createRecovery(mail, APP_EXT_HOST + "#/reset-password");
  },
  /**
   * Confirm and change password from recovery.
   * @param {string} user User token.
   * @param {string} secret Secret token.
   * @param {string} password New password.
   * @returns Promise<response>
   */
  confirmPassword: (user, secret, password) => {
    return SDK.account.updateRecovery(user, secret, password, password);
  },
  /**
   * Verify account.
   * @param {string} id
   * @param {string} token
   * @returns Promise<response>
   */
  confirm: (id, token) => {
    return SDK.account.updateVerification(id, token);
  },
  /**
   * Login user and sets user ID in state.
   * @param {string} user E-Mail
   * @param {string} pass Password
   * @returns Promise<session>
   */
  login: (user, pass) => {
    return SDK.account.createSession(user, pass);
  },
  /**
   * Logs out session form user.
   * @param {string} id Session ID
   * @returns Promise<response>
   */
  logoutSession: id => {
    return SDK.account.deleteSession(id);
  },
  /**
   * @param {string} id Backup ID
   * @returns Promise<response>
   * Set Cloud Timestamp from specific file
   */
  setCloudTimestamp: id => {
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
      type: "application/json",
    });

    return SDK.storage
      .createFile(
        new File([blob], `user:${cloud.currentUser}.json`),
        [`user:${cloud.currentUser}`],
        [`user:${cloud.currentUser}`]
      )
      .then(response => {
        state.updateCloudTimestamp(response.dateCreated);
        return response;
      });
  },
  /**
   * Get Security log from account.
   */
  getSecurityLog: () => {
    return SDK.account.getLogs();
  },
  /**
   * Get Sessions from account.
   */
  getSessions: () => {
    return SDK.account.getSessions();
  },
  /**
   * Restore from a backup.
   * @param {string} id Backup ID
   * @returns Promise<response>
   */
  restoreBackup: id => {
    const cookieFallback = localStorage.getItem("cookieFallback") || false;
    return fetch(SDK.storage.getFileView(id), {
      method: "GET",
      credentials: "include",
      mode: "cors",
      headers: {
        ...(cookieFallback && { "X-Fallback-Cookies": cookieFallback })
      }
    }).then(response => {
      if (!response.ok) throw new Error("Something went wrong");
      return response.json();
    })
      .then(response => {
        const data = response;
        const dataObject = Object.keys(data);
        return new Promise(resolve => {
          dataObject.forEach(k => localStorage.setItem(k, data[k]));
          cloud.setCloudTimestamp(id).then(() => resolve(true));
        });
      });
  },
  /**
   * Get all backups.
   */
  getAllBackups: () => {
    return SDK.storage.listFiles(
      "user:" + cloud.currentUser + ".json",
      25,
      0,
      "DESC"
    );
  },
  /**
   * Get latest backup.
   */
  getLatestBackup: () => {
    return SDK.storage.listFiles("", 1, 0, "DESC");
  },
  /**
   * Update e-mail.
   * @param {string} mail New e-mail.
   * @param {string} pass Current password.
   * @returns Promise<response>
   */
  updateEmail: (mail, pass) => {
    return SDK.account.updateEmail(mail, pass);
  },
  /**
   * Update name.
   * @param {string} name New name.
   * @returns Promise<response>
   */
  updateName: name => {
    return SDK.account.updateName(name);
  },
  /**
   * Update password.
   * @param {string} pass New password.
   * @param {string} old Current password.
   * @returns Promise<response>
   */
  updatePassword: (pass, old) => {
    return SDK.account.updatePassword(pass, old);
  },
};

export default cloud;
