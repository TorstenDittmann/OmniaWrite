<script>
  import { onMount } from "svelte";
  import { push } from "svelte-spa-router";
  import { _ } from "svelte-i18n";

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

<h2>{$_("cloud.logout.success")}</h2>
