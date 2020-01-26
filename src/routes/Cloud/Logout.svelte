<script>
  import { onMount } from "svelte";
  import { push } from "svelte-spa-router";

  import cloud from "../../appwrite";

  onMount(() => {
    cloud
      .logout()
      .then(setTimeout(() => push("/cloud"), 5000))
  })
</script>

<h2>Logout was successful. You will be redirected.</h2>