<script lang="javascript">
  import { onMount } from "svelte";
  import { state, settings } from "../stores";
  import { deskgap } from "../utils";
  import { _ } from "svelte-i18n";

  import cloud from "../appwrite";
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

  function login() {
    cloud.login(loginUser, loginPass);
  }

  function recover() {
    cloud.recoverPassword(loginUser).then(response => {
      console.log(response);
    });
  }

  function logout() {
    cloud.logout().then(response => {
      console.log(response);
    });
  }

  function register() {
    cloud.register(registerName, registerUser, registerPass);
  }

  function checkLogin() {
    cloud.isUserLoggedIn().then(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
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
  <div class="btn-group">
    <button on:click={recover}>Recover</button>
  </div>
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
  <div class="btn-group">
    <button
      on:click={logout}
      disabled={logoutButtonLoading}
      class:loading={logoutButtonLoading}>
      <span class="lnr lnr-sync spinner" />
      {$_('cloud.account.logout')}
    </button>
  </div>
</div>
