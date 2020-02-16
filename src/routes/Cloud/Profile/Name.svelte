<script>
  import cloud from "../../../appwrite";

  export let name;
  const updateName = () => {};
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
    <button on:click={updateName}>update</button>
  </div>
</form>
