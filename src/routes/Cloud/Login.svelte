<script>
  import { fade } from "svelte/transition";
  import { _ } from "svelte-i18n";
  import { push } from "svelte-spa-router";
  import { settings } from "../../stores";
  import { deskgap } from "../../utils";
  import { state } from "../../stores";

  import cloud from "../../appwrite";
  import Alert from "../../shared/Alert.svelte";

  let showAlert = false;
  let showAlertText;
  let alertSuccess = false;
  let alertDanger = false;

  let loginUser = "";
  let loginPass = "";
  let loginButtonLoading = false;

  const login = () => {
    loginButtonLoading = true;
    if (loginUser.length > 0 && loginPass.length > 0) {
      cloud.login(loginUser, loginPass).then(
        response => {
          state.setLogin(true);
          window.location.hash = "#/cloud";
          deskgap.reload();
        },
        err => {
          showAlert = true;
          showAlertText = "Login failed.";
          loginButtonLoading = false;
        }
      );
    } else {
      showAlert = true;
      showAlertText = "Login credentials can't be empty.";
      loginButtonLoading = false;
    }
  };
</script>

<style>
  .link {
    cursor: pointer;
  }
  .link:hover {
    text-decoration: underline;
  }
</style>

<div in:fade={{ duration: 100 }}>
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
        on:click|preventDefault={login}
        disabled={loginButtonLoading}
        class:loading={loginButtonLoading}>
        <span class="lnr lnr-sync spinner" />
        {$_('cloud.login.button')}
      </button>
    </div>
  </form>
  <small class="link" on:click={() => push('/cloud/reset-password')}>
    {$_('cloud.reset.title')}
  </small>
</div>
