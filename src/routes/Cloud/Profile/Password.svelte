<script>
  import { _ } from "svelte-i18n";

  import cloud from "../../../appwrite";
  import Toast from "../../../shared/Toast.svelte";

  let old_password = "";
  let new_password = "";
  let new_password_confirm = "";

  let textToast = "";
  let showToast = false;

  const updatePassword = () => {
    if (
      new_password === new_password_confirm && 
      new_password !== "" && 
      new_password_confirm !== "" && 
      old_password !== ""
      ) {
      cloud.updatePassword(new_password, old_password).then(
        response => {
          old_password = new_password = new_password_confirm = "";
          [showToast, textToast] = [true, $_("cloud.profile.password.success")];
        },
        error => {
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
  <div class="field">
    <label class="big" for="old">{$_("cloud.profile.password.fields.old")}</label>
    <input id="old" type="password" placeholder="***" bind:value={old_password} />
  </div>
  <div class="field">
    <label class="big" for="new">{$_("cloud.profile.password.fields.new")}</label>
    <input id="new" type="password" placeholder="***" bind:value={new_password} />
  </div>
  <div class="field">
    <label class="big" for="confirm">{$_("cloud.profile.password.fields.confirm")}</label>
    <input id="confirm" type="password" placeholder="***" bind:value={new_password_confirm} />
  </div>

  <div class="btn-group">
    <button on:click|preventDefault={updatePassword}>{$_("cloud.profile.action")}</button>
  </div>
</form>

<Toast bind:show={showToast} text={textToast} />
