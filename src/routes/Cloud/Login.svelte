<script>
  import { settings } from "../../stores";
  import { _ } from "svelte-i18n";

  import cloud from "../../appwrite";
  import Alert from "../../shared/Alert.svelte";

  let showAlert = false;
  let showAlertText;

  let loginUser = "";
  let loginPass = "";
  let loginButtonLoading = false;

  function login() {
    loginButtonLoading = true;
    if (loginUser.length > 0 && loginPass.length) {
      cloud.login(loginUser, loginPass);
    } else {
      showAlert = true;
      showAlertText = "Login credentialss can't be empty.";
      loginButtonLoading = false;
    }
  }
</script>

<style>

</style>

<h2>{$_('cloud.login.title')}</h2>
<Alert danger bind:show={showAlert}>
  <span class="lnr lnr-warning">{showAlertText}</span>
</Alert>
<form on:submit|preventDefault={login}>
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
</form>
