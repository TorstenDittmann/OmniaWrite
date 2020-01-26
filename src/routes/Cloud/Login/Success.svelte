<script>
  import { onMount } from "svelte";
  import { push } from "svelte-spa-router";

  onMount(() => {
    setTimeout(() => push("/cloud"), 5000);
  })
</script>

<h2>Login was successful. You will be redirected.</h2>