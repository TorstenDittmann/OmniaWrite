<script>
  import { onMount } from "svelte";
  import cloud from "../../../appwrite";

  let confirmed;
  onMount(() => {
    let query = new URLSearchParams(window.location.search);
    cloud
      .confirm(query.get("userId"), query.get("token"))
      .then(
        response => {
          console.log(response);
          confirmed = true;
        }, 
        error => {
          console.log(error);
          confirmed = false;
        });
  });
</script>
{#if confirmed}
Account confirmed!
{:else}
Failure.
{/if}