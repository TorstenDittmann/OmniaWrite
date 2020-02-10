<script>
  import { onMount } from "svelte";
  import { push } from "svelte-spa-router";

  import cloud from "../../appwrite";
  import { deskgap } from "../../utils";

  onMount(() => {
    cloud.logout().then(
      setTimeout(() => {
        window.location.hash = "#/cloud";
        deskgap.reload();
      }, 2500)
    );
  });
</script>

<h2>Logout was successful. You will be redirected.</h2>
