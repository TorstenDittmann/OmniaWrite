<script>
  import cloud from "../../../appwrite";

  let old_password;
  let new_password;
  let new_password_confirm;

  const updatePassword = () => {};
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
    <button on:click={updatePassword}>update</button>
  </div>
</form>
