<script>
  import { _ } from "svelte-i18n";

  import cloud from "../../../appwrite";
  import Toast from "../../../shared/Toast.svelte";

  let old_password;
  let new_password;
  let new_password_confirm;

  let textToast = "";
  let showToast = false;

  const updatePassword = () => {
    if (new_password === new_password_confirm) {
      cloud.updatePassword(new_password, old_password).then(
        response => {
          old_password = new_password = new_password_confirm = "";
          textToast = "Password changed!";
          showToast = true;
        },
        error => {
          console.log(error);
        }
      );
    } else {
      textToast = "Passwords have to match";
      showToast = true;
    }
  };
</script>

<h2>Update password</h2>

<form on:submit|preventDefault={updatePassword}>
  <div class="field">
    <label class="big" for="old">Old password</label>
    <input id="old" type="password" bind:value={old_password} />
  </div>
  <div class="field">
    <label class="big" for="new">New password</label>
    <input id="new" type="password" bind:value={new_password} />
  </div>
  <div class="field">
    <label class="big" for="confirm">Confirm password</label>
    <input id="confirm" type="password" bind:value={new_password_confirm} />
  </div>

  <div class="btn-group">
    <button on:click|preventDefault={updatePassword}>update</button>
  </div>
</form>

<Toast bind:show={showToast} text={textToast} />
