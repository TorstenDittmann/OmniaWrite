<script>
  import { _ } from "svelte-i18n";
  import cloud from "../../appwrite";

  import Modal from "../../shared/Modal.svelte";
  import Policy from "./Policy.svelte";

  let registerName;
  let registerUser;
  let registerPass;

  let statusPrivacyPolicy;
  let showPrivacyPolicy;

  let registerButtonLoading = false;

  function register() {
    cloud.register(registerName, registerUser, registerPass);
  }
</script>

<style>
  .disclaimer-check {
    width: 3rem;
    min-width: 3rem;
    margin-right: 1rem;
  }

  .disclaimer-button {
    width: calc(100% - 4rem);
  }
</style>

<Modal bind:show={showPrivacyPolicy}>
  <h2 slot="header">{$_('cloud.privacy.show')}</h2>
  <Policy />
</Modal>

<h2>{$_('cloud.register.title')}</h2>
<form on:submit|preventDefault={register}>
  <div class="field">
    <label class="big" for="newName">{$_('cloud.register.name')}</label>
    <input
      id="newName"
      type="text"
      placeholder="John Doe"
      autocomplete="off"
      bind:value={registerName} />
  </div>
  <div class="field">
    <label class="big" for="newUser">{$_('cloud.login.email')}</label>
    <input
      id="newUser"
      type="email"
      placeholder="john.doe@email.tld"
      autocomplete="off"
      bind:value={registerUser} />
  </div>
  <div class="field">
    <label class="big" for="newPass">{$_('cloud.login.password')}</label>
    <input
      id="newPass"
      type="password"
      autocomplete="off"
      placeholder="******"
      bind:value={registerPass} />
  </div>
  <div class="btn-group">
    <button
      class="disclaimer-check"
      class:red={!statusPrivacyPolicy}
      class:green={statusPrivacyPolicy}
      on:click={() => (statusPrivacyPolicy = !statusPrivacyPolicy)}>
      <span
        class="lnr"
        class:lnr-cross-circle={!statusPrivacyPolicy}
        class:lnr-checkmark-circle={statusPrivacyPolicy} />
    </button>
    <button
      class="disclaimer-button outline"
      on:click={() => (showPrivacyPolicy = true)}>
      {$_('cloud.privacy.show')}
    </button>
  </div>
  <div class="btn-group">
    <button
      on:click={register}
      disabled={registerButtonLoading}
      class:loading={registerButtonLoading}>
      <span class="lnr lnr-sync spinner" />
      {$_('cloud.register.button')}
    </button>
  </div>
</form>
