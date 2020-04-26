<script>
  import { _ } from "svelte-i18n";

  import cloud from "../../../appwrite";
  import Toast from "../../../shared/Toast.svelte";

  export let name;

  let showToast = false;
  let textToast = "";

  const updateName = () => {
    cloud.updateName(name).then(
      response => {
        [showToast, textToast] = [true, $_("cloud.profile.name.success")];
      },
      error => {
        [showToast, textToast] = [true, $_("cloud.profile.error")];
      }
    );
  };
</script>

<h2>{$_("cloud.profile.name.title")}</h2>

<form on:submit|preventDefault={updateName}>
  <div class="field">
    <label class="big" for="name">{$_("cloud.profile.name.fields.name")}</label>
    <input
      id="name"
      type="text"
      placeholder="john.doe@email.tld"
      bind:value={name} />
  </div>
  <div class="btn-group">
    <button on:click|preventDefault={updateName}>{$_("cloud.profile.action")}</button>
  </div>
</form>

<Toast bind:show={showToast} text={textToast} />
