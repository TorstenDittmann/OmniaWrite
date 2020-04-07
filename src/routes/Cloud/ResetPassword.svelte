<script>
  import { _ } from "svelte-i18n";
  import cloud from "../../appwrite";

  let recoverUser = "";
  let recoverState = false;
  function recover() {
    cloud.recoverPassword(recoverUser).then(response => {
      recoverState = true;
    });
  }
</script>

<style>

</style>

{#if recoverState}
  <span class="lnr lnr-checkmark-circle" />
  Please check you emails for further instructions!
{:else}
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
      <button on:click|preventDefault={recover}>
        {$_('cloud.reset.title')}
      </button>
    </div>
  </form>
{/if}
