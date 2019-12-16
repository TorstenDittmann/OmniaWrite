<script lang="javascript">
  import { onMount } from "svelte";
  import { state, settings } from "../stores";
  import { deskgap } from "../utils";
  import { _ } from "svelte-i18n";

  import cloud from "../cloud";
  import Alert from "../shared/Alert.svelte";
  import Toast from "../shared/Toast.svelte";
  import Modal from "../shared/Modal.svelte";
  import Policy from "./Cloud/Policy.svelte";

  import moment from "moment";
  import "moment/locale/de";

  moment.locale($settings.language);

  export let hideExport = false;

  let dataLoaded = false;

  let registerName;
  let registerUser;
  let registerPass;

  let loginUser;
  let loginPass;

  let resetUser;

  let isUserLoggedIn = false;

  let showAlert = false;
  let showAlertType;
  let showAlertText;

  let showToast = false;
  let showToastText;

  let statusPrivacyPolicy;
  let showPrivacyPolicy;

  let saveCloudButtonLoading = false;
  let getCloudButtonLoading = false;
  let loginButtonLoading = false;
  let registerButtonLoading = false;
  let logoutButtonLoading = false;
  let resetButtonLoading = false;

  onMount(() => {
    checkLogin();
  });

  function saveCloud() {
    saveCloudButtonLoading = true;
    cloud.saveToCloud().then(retValue => {
      if (retValue == true) {
        saveCloudButtonLoading = false;

        showToast = true;
        showToastText = $_("cloud.toast.savedCloud");
      }
    });
  }

  async function getCloud() {
    getCloudButtonLoading = true;
    cloud.saveFromCloud().then(retValue => {
      if (retValue == true) {
        getCloudButtonLoading = false;
        deskgap.reload();
      }
    });
  }

  function login() {
    loginButtonLoading = true;
    cloud
      .login(loginUser, loginPass)
      .then(loggedInUser => {
        state.setCurrentUser(
          loggedInUser.objectId,
          loggedInUser.email,
          loggedInUser["user-token"]
        );
        checkLogin();
        showAlert = false;
        loginButtonLoading = false;
        showToast = true;
        showToastText = $_("cloud.toast.loginSuccessful");
      })
      .catch(error => {
        showAlert = true;
        showAlertText =
          error.message + (error.code ? " - code: " + error.code : "");
        loginButtonLoading = false;
      });
  }

  function register() {
    registerButtonLoading = true;
    if (statusPrivacyPolicy) {
      cloud
        .register(registerName, registerUser, registerPass)
        .then(registeredUser => {
          return registeredUser;
        })
        .then(registeredUser => {
          checkLogin();
          registerButtonLoading = false;
          showAlert = true;
          showAlertText = $_("cloud.toast.activateEmail");
        })
        .catch(error => {
          showAlert = true;
          showAlertText =
            error.message + (error.code ? " - code: " + error.code : "");
          registerButtonLoading = false;
        });
    } else {
      registerButtonLoading = false;
      showAlert = true;
      showAlertText = $_("cloud.toast.acceptPolicy");
    }
  }

  function resetPassword() {
    resetButtonLoading = true;
    Backendless.UserService.restorePassword(resetUser)
      .then(() => {
        showAlert = true;
        showAlertText = $_("cloud.toast.resetPassword");
        resetButtonLoading = false;
      })
      .catch(error => {
        showAlert = true;
        showAlertText =
          error.message + (error.code ? " - code: " + error.code : "");
        resetButtonLoading = false;
      });
  }

  function logout() {
    logoutButtonLoading = true;
    cloud.logout().then(() => {
      checkLogin();
      logoutButtonLoading = false;
    });
  }

  async function checkLogin() {
    dataLoaded = false;
    cloud.isUserLoggedIn().then(retValue => {
      isUserLoggedIn = retValue;
      dataLoaded = true;
    });
  }
</script>

<style type="text/css">
  .disclaimer-check {
    width: 3rem;
    min-width: 3rem;
    margin-right: 1rem;
  }

  .disclaimer-button {
    width: calc(100% - 4rem);
  }

  .cloud-container {
    max-width: 800px;
  }

  .grid .cloud {
    text-align: center;
  }

  .grid .cloud .lnr {
    font-size: 3rem;
  }
</style>

<Toast bind:show={showToast} text={showToastText} />
<Modal bind:show={showPrivacyPolicy}>
  <h2 slot="header">{$_('cloud.privacy.show')}</h2>
  <Policy />
</Modal>
<div class="cloud-container">
  {#if dataLoaded}
    <Alert danger bind:show={showAlert}>
      <span class="lnr lnr-warning">{showAlertText}</span>
    </Alert>
    {#if isUserLoggedIn}
      <h2>{$_('cloud.cloud.title')}</h2>
      <div id="cards" class="grid">
        {#if saveCloudButtonLoading || getCloudButtonLoading}
          <div class="cloud">
            <span class="lnr lnr-sync spinner loading" />
          </div>
        {:else}
          {#if $state.lastCloudSave < $state.lastLocalSave}
            <div class="cloud" on:click={saveCloud}>
              <span class="lnr lnr-cloud-upload" />
              Upload
              <small>
                <i>
                  {$_('cloud.updated')}
                  {moment($state.lastLocalSave, 'X').fromNow()}
                </i>
              </small>
            </div>
          {/if}
          <div class="cloud" on:click={getCloud}>
            <span class="lnr lnr-cloud-download" />
            Download
            <small>
              <i>
                {$_('cloud.updated')}
                {moment($state.lastCloudSave, 'X').fromNow()}
              </i>
            </small>
          </div>
        {/if}
      </div>
      <h2>{$_('cloud.account.title')}</h2>
      <div class="field">
        <label class="big" for="editChapterInput">
          {$_('cloud.account.connectedAccount')}
        </label>
        {$state.currentUserEmail}
      </div>
      <div class="btn-group">
        <button
          on:click={logout}
          disabled={logoutButtonLoading}
          class:loading={logoutButtonLoading}>
          <span class="lnr lnr-sync spinner" />
          {$_('cloud.account.logout')}
        </button>
      </div>
    {:else}
      <h2>{$_('cloud.login.title')}</h2>
      <div class="field">
        <label class="big" for="loginUser">{$_('cloud.login.email')}</label>
        <input
          id="loginUser"
          type="email"
          placeholder="john.doe@email.tld"
          bind:value={loginUser} />
      </div>
      <div class="field">
        <label class="big" for="loginPass">{$_('cloud.login.password')}</label>
        <input
          id="loginPass"
          type="password"
          autocomplete="off"
          placeholder="******"
          bind:value={loginPass} />
      </div>
      <div class="btn-group">
        <button
          on:click={login}
          disabled={loginButtonLoading}
          class:loading={loginButtonLoading}>
          <span class="lnr lnr-sync spinner" />
          {$_('cloud.login.button')}
        </button>
      </div>
      {#if !hideExport}
        <h2>{$_('cloud.register.title')}</h2>
        <div class="field">
          <label class="big" for="newName">{$_('cloud.register.name')}</label>
          <input
            id="newName"
            type="text"
            placeholder="John Doe"
            autocomplete="off"
            bind:value={registerName} />
        </div>
        <div class="field">
          <label class="big" for="newUser">{$_('cloud.login.email')}</label>
          <input
            id="newUser"
            type="email"
            placeholder="john.doe@email.tld"
            autocomplete="off"
            bind:value={registerUser} />
        </div>
        <div class="field">
          <label class="big" for="newPass">{$_('cloud.login.password')}</label>
          <input
            id="newPass"
            type="password"
            autocomplete="off"
            placeholder="******"
            bind:value={registerPass} />
        </div>
        <div class="btn-group">
          <button
            class="disclaimer-check"
            class:red={!statusPrivacyPolicy}
            class:green={statusPrivacyPolicy}
            on:click={() => (statusPrivacyPolicy = !statusPrivacyPolicy)}>
            <span
              class="lnr"
              class:lnr-cross-circle={!statusPrivacyPolicy}
              class:lnr-checkmark-circle={statusPrivacyPolicy} />
          </button>
          <button
            class="disclaimer-button outline"
            on:click={() => (showPrivacyPolicy = true)}>
            {$_('cloud.privacy.show')}
          </button>
        </div>
        <div class="btn-group">
          <button
            on:click={register}
            disabled={registerButtonLoading}
            class:loading={registerButtonLoading}>
            <span class="lnr lnr-sync spinner" />
            {$_('cloud.register.button')}
          </button>
        </div>
      {/if}
      <h2>{$_('cloud.reset.title')}</h2>
      <div class="field">
        <label class="big" for="resetUser">{$_('cloud.login.email')}</label>
        <input
          id="resetUser"
          type="email"
          placeholder="john.doe@email.tld"
          autocomplete="off"
          bind:value={resetUser} />
      </div>
      <div class="btn-group">
        <button
          on:click={resetPassword}
          disabled={resetButtonLoading}
          class:loading={resetButtonLoading}>
          <span class="lnr lnr-sync spinner" />
          {$_('cloud.reset.button')}
        </button>
      </div>
    {/if}
  {:else}
    <div class="lds-ellipsis">
      <div />
      <div />
      <div />
      <div />
    </div>
  {/if}
</div>
