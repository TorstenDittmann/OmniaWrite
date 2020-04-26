<script>
  import { _ } from "svelte-i18n";

  import cloud from "../../../appwrite";
  import Toast from "../../../shared/Toast.svelte";

  export let email;

  let password = "";
  let showToast = false;
  let textToast = "";

  const updateEmail = () => {
    cloud.updateEmail(email, password).then(
      response => {
        [showToast, textToast] = [true, $_("cloud.profile.email.success")];
      },
      error => {
        [showToast, textToast] = [true, $_("cloud.profile.error")];
      }
    );
  };
</script>

<h2>{$_("cloud.profile.email.title")}</h2>

<form on:submit|preventDefault={updateEmail}>
  <div class="field">
    <label class="big" for="email">{$_("cloud.profile.email.fields.email")}</label>
    <input
      id="email"
      type="email"
      placeholder="john.doe@email.tld"
      bind:value={email} />
  </div>
  <div class="field">
    <label class="big" for="email">{$_("cloud.profile.email.fields.password")}</label>
    <input
      id="password"
      type="password"
      placeholder="***"
      bind:value={password} />
  </div>
  <div class="btn-group">
    <button on:click|preventDefault={updateEmail}>{$_("cloud.profile.action")}</button>
  </div>
</form>

<Toast bind:show={showToast} text={textToast} />
