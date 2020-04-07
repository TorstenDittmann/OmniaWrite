<script>
  import { state, tabs } from "../../stores";

  import cloud from "../../appwrite";
  import Spinner from "../../shared/Spinner.svelte";
  import Toast from "../../shared/Toast.svelte";

  let isValidLogin = $state.isUserLoggedIn;
  let buttonState = "none";
  let showCloudUpload = false;
  let isCloudUploading = false;
  let latestBackup = false;
  let showToast = false;

  const syncCloud = () => {
    buttonState = "loading";
    cloud.saveToCloud().then(
      response => {
        buttonState = "done";
      },
      error => {
        buttonState = "upload";
        showToast = true;
      }
    );
  };

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

<Toast bind:show={showToast} text="Something went wrong." />
{#if buttonState === 'upload'}
  <li on:click={syncCloud} style="-webkit-app-region: no-drag">
    <span class="lnr lnr-cloud-upload" />
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
