<script>
  import { fade } from "svelte/transition";
  import { _ } from "svelte-i18n";
  import { push } from "svelte-spa-router";
  import { settings } from "../../stores";
  import { deskgap } from "../../utils";
  import { state } from "../../stores";

  import cloud from "../../appwrite";
  import Alert from "../../shared/Alert.svelte";

  import InputEmail from "../../components/InputEmail.svelte";
  import InputPassword from "../../components/InputPassword.svelte";
  import ButtonGroup from "../../components/ButtonGroup.svelte";
  import Button from "../../components/Button.svelte";

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
          showAlertText = $_('cloud.login.responses.failed');
          loginButtonLoading = false;
        }
      );
    } else {
      showAlert = true;
      showAlertText = $_('cloud.login.responses.empty');
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
    <InputEmail 
      label={$_('cloud.login.email')} 
      placeholder="john.doe@email.tld"
      bind:value={loginUser} />
    <InputPassword 
      label={$_('cloud.login.password')} 
      placeholder="******"
      bind:value={loginPass} />
    <ButtonGroup>
      <Button on:click={login} loading={loginButtonLoading}>
        {$_('cloud.login.button')}
      </Button>
    </ButtonGroup>
  </form>
  <small class="link" on:click={() => push('/cloud/reset-password')}>
    {$_('cloud.reset.title')}
  </small>
</div>
