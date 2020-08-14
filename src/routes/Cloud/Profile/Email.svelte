<script>
  import { _ } from "svelte-i18n";

  import cloud from "../../../appwrite";
  import Toast from "../../../shared/Toast.svelte";

  import {
    InputEmail,
    InputPassword,
    ButtonGroup,
    Button,
  } from "../../../components/Forms";

  export let email;

  let password = "";
  let showToast = false;
  let textToast = "";
  let loading = false;

  const updateEmail = () => {
    loading = true;
    cloud.updateEmail(email, password).then(
      () => {
        loading = false;
        password = "";
        [showToast, textToast] = [true, $_("cloud.profile.email.success")];
      },
      () => {
        loading = false;
        [showToast, textToast] = [true, $_("cloud.profile.error")];
      }
    );
  };
</script>

<h2>{$_("cloud.profile.email.title")}</h2>

<form on:submit|preventDefault={updateEmail}>
  <InputEmail
    label={$_("cloud.profile.email.fields.email")}
    placeholder="john.doe@email.tld"
    bind:value={email} />
  <InputPassword
    label={$_("cloud.profile.email.fields.password")}
    placeholder="******"
    bind:value={password} />
  <ButtonGroup>
    <Button on:click={updateEmail} {loading}>
      {$_("cloud.profile.action")}
    </Button>
  </ButtonGroup>
</form>

<Toast bind:show={showToast} text={textToast} />
