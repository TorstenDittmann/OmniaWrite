<script>
  import { state, tabs } from "../../stores";

  import cloud from "../../appwrite";
  import Spinner from "../../shared/Spinner.svelte";

  let isValidLogin = $state.isUserLoggedIn;
  let buttonState = "none";
  let showCloudUpload = false;
  let isCloudUploading = false;
  let latestBackup = false;

  const syncCloud = () => {
    buttonState = "loading";
    cloud.saveToCloud().then(response => {
      buttonState = "done";
    });
  };

  setInterval(() => {
    cloud.getLatestBackup().then(response => {
      // TODO: Implement checking for new Cloud Backup
      if (response.files.length > 0) {
        latestBackup = response.files[0].dateCreated;
      }
    });
  }, 6000);

  $: {
    if (isValidLogin) {
      if (
        !$state.lastCloudSave ||
        $state.lastCloudSave < $state.lastLocalSave
      ) {
        buttonState = "upload";
      } else {
        buttonState = "done";
      }
    }
  }
</script>

{#if buttonState === 'upload'}
  <li on:click={syncCloud} style="-webkit-app-region: no-drag">
    <span class="lnr lnr-cloud-upload" />
  </li>
{:else if buttonState === 'download'}
  <li on:click={syncCloud} style="-webkit-app-region: no-drag">
    <span class="lnr lnr-cloud-download" />
  </li>
{:else if buttonState === 'done'}
  <li>
    <span class="lnr lnr-cloud-check" />
  </li>
{:else if buttonState === 'loading'}
  <li>
    <Spinner />
  </li>
{/if}
