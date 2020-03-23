<script>
  import { _ } from "svelte-i18n";

  import cloud from "../../../appwrite";
  import Toast from "../../../shared/Toast.svelte";

  export let name;

  let showToast = false;

  const updateName = () => {
    cloud.updateName(name).then(
      response => {
        showToast = true;
      },
      error => {
        console.log(error);
      }
    );
  };
</script>

<h2>Update name</h2>

<form on:submit|preventDefault={updateName}>
  <div class="field">
    <label class="big" for="name">Name</label>
    <input
      id="name"
      type="text"
      placeholder="john.doe@email.tld"
      bind:value={name} />
  </div>
  <div class="btn-group">
    <button on:click|preventDefault={updateName}>update</button>
  </div>
</form>

<Toast bind:show={showToast} text={$_('common.profile.update-name')} />
