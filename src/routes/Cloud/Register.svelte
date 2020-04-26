<script>
  import { fade } from "svelte/transition";
  import { _ } from "svelte-i18n";
  import cloud from "../../appwrite";

  import Modal from "../../shared/Modal.svelte";
  import Policy from "./Policy.svelte";
  import Alert from "../../shared/Alert.svelte";

  let showAlert = false;
  let showAlertText;
  let alertSuccess = false;
  let alertDanger = false;

  let registerName = "";
  let registerUser = "";
  let registerPass = "";

  let statusPrivacyPolicy;
  let showPrivacyPolicy;

  let registerButtonLoading = false;

  function register() {
    registerButtonLoading = true;
    if (
      statusPrivacyPolicy &&
      registerName.length > 0 &&
      registerUser.length > 0 &&
      registerPass.length > 0
    ) {
      cloud.register(registerName, registerUser, registerPass).then(
        response => {
          registerButtonLoading = false;
          showAlert = true;
          showAlertText = $_('cloud.register.responses.success');
          alertDanger = false;
          alertSuccess = true;
        },
        error => {
          registerButtonLoading = false;
          showAlert = true;
          showAlertText = $_('cloud.register.responses.failed');
          alertDanger = true;
          alertSuccess = false;
        }
      );
    } else {
      registerButtonLoading = false;
      showAlert = true;
      showAlertText = $_('cloud.register.responses.empty');
      alertDanger = true;
      alertSuccess = false;
    }
  }
</script>

<style>
  .link {
    cursor: pointer;
  }
  .link:hover {
    text-decoration: underline;
  }
</style>

<Modal bind:show={showPrivacyPolicy}>
  <h2 slot="header">{$_('cloud.privacy.show')}</h2>
  <Policy />
</Modal>

<div in:fade={{ duration: 100 }}>
  <h2>{$_('cloud.register.title')}</h2>
  <Alert danger={!alertSuccess} success={alertSuccess} bind:show={showAlert}>
    <span class="lnr success">{showAlertText}</span>
  </Alert>
  <form on:submit|preventDefault={register}>
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
    <p>
      <input
        id="PrivacyPolicy"
        type="checkbox"
        bind:checked={statusPrivacyPolicy} />
      <label for="PrivacyPolicy">
        <span class="link" on:click={() => (showPrivacyPolicy = true)}>
          {' ' + $_('cloud.privacy.show')}
        </span>
      </label>
    </p>
    <div class="btn-group">
      <button
        type="submit"
        on:click|preventDefault={register}
        disabled={registerButtonLoading}
        class:loading={registerButtonLoading}>
        <span class="lnr lnr-sync spinner" />
        {$_('cloud.register.button')}
      </button>
    </div>
  </form>
</div>
