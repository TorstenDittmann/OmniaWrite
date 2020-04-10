<script>
  import { onMount } from "svelte";
  import cloud from "../../appwrite";

  let new_password = "";
  let new_password_confirm = "";
  let confirmState = false;

  const confirmPassword = () => {
    let query = new URLSearchParams(window.location.search);
    cloud
      .confirmPassword(query.get("userId"), query.get("secret"), new_password)
      .then(response => {
        confirmState = true;
      });
  };
</script>

<h2>Update password</h2>

{#if confirmState}
  <span class="lnr lnr-checkmark-circle" />
  Password changed!
{:else}
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
{/if}
