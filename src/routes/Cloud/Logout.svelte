<script>
  import { onMount } from "svelte";
  import { push } from "svelte-spa-router";

  import { state } from "../../stores";

  import cloud from "../../appwrite";
  import { deskgap } from "../../utils";

  onMount(() => {
    cloud.logoutSession("current").then(
      setTimeout(() => {
        state.setLogin(false);
        window.location.hash = "#/cloud";
        deskgap.reload();
      }, 1500)
    );
  });
</script>

<h2>Logout was successful. You will be redirected.</h2>
