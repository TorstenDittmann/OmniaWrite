<script>
  import { _ } from "svelte-i18n";
  import cloud from "../../appwrite";

  let recoverUser;
  function recover() {
    cloud.recoverPassword(loginUser).then(response => {
      console.log(response);
    });
  }
</script>

<style>

</style>

<form on:submit|preventDefault={recover}>
  <div class="field">
    <label class="big" for="loginUser">{$_('cloud.login.email')}</label>
    <input
      id="loginUser"
      type="email"
      placeholder="john.doe@email.tld"
      bind:value={recoverUser} />
  </div>
  <div class="btn-group">
    <button on:click={recover}>Recover</button>
  </div>
</form>
