<script>

  import { _ } from "svelte-i18n";

  import cloud from "../../../appwrite";
  import Toast from "../../../shared/Toast.svelte";

  import InputPassword from "../../../components/InputPassword.svelte";
  import Button from "../../../components/Button.svelte";
  import ButtonGroup from "../../../components/ButtonGroup.svelte";

  let old_password = "";
  let new_password = "";
  let new_password_confirm = "";

  let textToast = "";
  let showToast = false;
  let loading = false;

  const updatePassword = () => {
    if (
      new_password === new_password_confirm && 
      new_password !== "" && 
      new_password_confirm !== "" && 
      old_password !== ""
      ) {
        loading = true;
      cloud.updatePassword(new_password, old_password).then(
        response => {
          loading = false;
          old_password = new_password = new_password_confirm = "";
          [showToast, textToast] = [true, $_("cloud.profile.password.success")];
        },
        error => {
          loading = false;
          [showToast, textToast] = [true, $_("cloud.profile.error")];
        }
      );
    } else {
      [showToast, textToast] = [true, $_("cloud.profile.password.match")];
    }
  };
</script>

<h2>{$_("cloud.profile.password.title")}</h2>

<form on:submit|preventDefault={updatePassword}>
  <InputPassword
    label={$_("cloud.profile.password.fields.old")} 
    placeholder="******"
    bind:value={old_password} />
  <InputPassword
    label={$_("cloud.profile.password.fields.new")} 
    placeholder="******"
    bind:value={new_password} />
  <InputPassword
    label={$_("cloud.profile.password.fields.confirm")} 
    placeholder="******"
    bind:value={new_password_confirm} />
  <ButtonGroup>
    <Button on:click={updatePassword} {loading}>
      {$_("cloud.profile.action")}
    </Button>
  </ButtonGroup>
</form>

<Toast bind:show={showToast} text={textToast} />
