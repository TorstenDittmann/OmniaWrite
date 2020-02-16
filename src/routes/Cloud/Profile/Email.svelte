<script>
  import cloud from "../../../appwrite";

  export let email;

  let password;

  const updateEmail = () => {};
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
    <input id="password" type="password" placeholder="***" />
  </div>
  <div class="btn-group">
    <button on:click={updateEmail}>update</button>
  </div>
</form>
