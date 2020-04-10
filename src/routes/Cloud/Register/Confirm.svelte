<script>
  import { onMount } from "svelte";
  import cloud from "../../../appwrite";

  let confirmed;
  onMount(() => {
    let query = new URLSearchParams(window.location.search);
    console.log(query);
    console.log(query.get("secret"));

    cloud.confirm(query.get("userId"), query.get("secret")).then(
      response => {
        console.log(response);
        confirmed = true;
      },
      error => {
        console.log(error);
        confirmed = false;
      }
    );
  });
</script>

{#if confirmed}Account confirmed!{:else}Failure.{/if}
