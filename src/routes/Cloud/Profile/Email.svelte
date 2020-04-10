<script>
  import { _ } from "svelte-i18n";

  import cloud from "../../../appwrite";
  import Toast from "../../../shared/Toast.svelte";

  export let email;

  let password = "";
  let showToast = false;

  const updateEmail = () => {
    cloud.updateEmail(email, password).then(
      response => {
        showToast = true;
      },
      error => {
        console.log(error);
      }
    );
  };
</script>

<h2>Update e-mail</h2>

<form on:submit|preventDefault={updateEmail}>
  <div class="field">
    <label class="big" for="email">E-Mail</label>
    <input
      id="email"
      type="email"
      placeholder="john.doe@email.tld"
      bind:value={email} />
  </div>
  <div class="field">
    <label class="big" for="email">Password</label>
    <input
      id="password"
      type="password"
      placeholder="***"
      bind:value={password} />
  </div>
  <div class="btn-group">
    <button on:click|preventDefault={updateEmail}>update</button>
  </div>
</form>

<Toast bind:show={showToast} text={$_("common.profile.update-email")} />
