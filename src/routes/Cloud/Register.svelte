<script>
  import { push } from "svelte-spa-router";
  import { fade } from "svelte/transition";
  import { _ } from "svelte-i18n";
  import cloud from "../../appwrite";

  import Modal from "../../shared/Modal.svelte";
  import Policy from "./Policy.svelte";
  import Alert from "../../shared/Alert.svelte";

  import {
    Input,
    InputEmail,
    InputPassword,
    Checkbox,
    ButtonGroup,
    Button,
  } from "../../components/Forms";

  let showAlert = false;
  let showAlertText;
  let alertSuccess = false;
  let alertDanger = false;

  const form = {
    name: "",
    email: "",
    pass: "",
    policy: false,
  };

  let showPrivacyPolicy;

  let registerButtonLoading = false;

  $: checkForm =
    form.name !== "" && form.email !== "" && form.pass !== "" && form.policy;

  const register = () => {
    registerButtonLoading = true;
    if (!checkForm) {
      registerButtonLoading = false;
      showAlert = true;
      showAlertText = $_("cloud.register.responses.empty");
      alertDanger = true;
      alertSuccess = false;
      return;
    }
    cloud.register(form.name, form.email, form.pass).then(
      () => {
        registerButtonLoading = false;
        showAlert = true;
        showAlertText = $_("cloud.register.responses.success");
        alertDanger = false;
        alertSuccess = true;
      },
      () => {
        registerButtonLoading = false;
        showAlert = true;
        showAlertText = $_("cloud.register.responses.failed");
        alertDanger = true;
        alertSuccess = false;
      }
    );
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

<Modal bind:show={showPrivacyPolicy}>
  <h2 slot="header">{$_("cloud.privacy.show")}</h2>
  <Policy />
</Modal>

<div in:fade={{ duration: 100 }}>
  <h2>{$_("cloud.register.title")}</h2>
  <Alert danger={!alertSuccess} success={alertSuccess} bind:show={showAlert}>
    <span class="lnr success">{showAlertText}</span>
  </Alert>
  <form on:submit|preventDefault={register}>
    <Input
      label={$_("cloud.register.name")}
      placeholder="John Doe"
      bind:value={form.name} />
    <InputEmail
      label={$_("cloud.login.email")}
      placeholder="john.doe@email.tld"
      bind:value={form.email} />
    <InputPassword
      label={$_("cloud.login.password")}
      placeholder="******"
      bind:value={form.pass} />
    <Checkbox
      bind:value={form.policy}
      label={$_("cloud.privacy.show")}
      helper={$_("install.disclaimer.action")} />
    <ButtonGroup>
      <Button
        on:click={register}
        loading={registerButtonLoading}
        disabled={!checkForm}>
        {$_("cloud.register.button")}
      </Button>
    </ButtonGroup>
    <small class="link" on:click={() => (showPrivacyPolicy = true)}>
      {$_("cloud.privacy.show")}
    </small>
    <h2>{$_("cloud.register.login")}</h2>
    <ButtonGroup>
      <Button on:click={() => push("/cloud")}>{$_("cloud.login.title")}</Button>
    </ButtonGroup>
  </form>
</div>
