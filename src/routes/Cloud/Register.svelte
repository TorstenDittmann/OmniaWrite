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
  .link {
    cursor: pointer;
  }
  .link:hover {
    text-decoration: underline;
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
  <p>
    <input
      id="PrivacyPolicy"
      type="checkbox"
      bind:checked={statusPrivacyPolicy} />
    <label for="PrivacyPolicy">
      I agree to the
      <span class="link" on:click={() => (showPrivacyPolicy = true)}>
        {' ' + $_('cloud.privacy.show')}
      </span>
    </label>
  </p>
  <div class="btn-group">
    <button
      type="submit"
      on:click={register}
      disabled={registerButtonLoading}
      class:loading={registerButtonLoading}>
      <span class="lnr lnr-sync spinner" />
      {$_('cloud.register.button')}
    </button>
  </div>
</form>
