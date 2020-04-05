<script>
  import { onMount } from "svelte";
  import cloud from "../../appwrite";

  let confirmed;
  let new_password = "";
  let new_password_confirm = "";

  const confirmPassword = () => {
    let query = new URLSearchParams(window.location.search);
    cloud.confirmPassword(
      query.get("userId"),
      query.get("secret"),
      new_password
    );
  };
</script>

{#if confirmed}Account confirmed!{:else}Failure.{/if}

<h2>Update password</h2>

<form on:submit|preventDefault={confirmPassword}>
  <div class="field">
    <label class="big" for="new">New password</label>
    <input id="new" type="password" bind:value={new_password} />
  </div>
  <div class="field">
    <label class="big" for="confirm">Confirm password</label>
    <input id="confirm" type="password" bind:value={new_password_confirm} />
  </div>

  <div class="btn-group">
    <button on:click|preventDefault={confirmPassword}>update</button>
  </div>
</form>
