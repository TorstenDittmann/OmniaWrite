<script>
  import { state, tabs } from "../../stores";

  import cloud from "../../appwrite";
  import Spinner from "../../shared/Spinner.svelte";

  let isValidLogin = $state.isUserLoggedIn;
  let showCloudUpload = false;
  let isCloudUploading = false;

  const syncCloud = () => {
    showCloudUpload = false;
    isCloudUploading = true;
    cloud.saveToCloud().then(response => {
      console.log(response);
      isCloudUploading = false;
    });
  };

  $: {
    if (isValidLogin) {
      if (
        !$state.lastCloudSave ||
        $state.lastCloudSave < $state.lastLocalSave
      ) {
        showCloudUpload = true;
      } else {
        showCloudUpload = false;
      }
    }
  }
</script>

{#if isValidLogin}
  {#if showCloudUpload}
    <li on:click={syncCloud} style="-webkit-app-region: no-drag">
      <span class="lnr lnr-cloud-upload" />
    </li>
  {:else}
    <li>
      <span class="lnr lnr-cloud-check" />
    </li>
  {/if}
  {#if isCloudUploading}
    <li>
      <Spinner />
    </li>
  {/if}
{/if}
