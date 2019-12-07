<script lang="javascript">
  import { Export, ExportRTF } from "../export";
  import { state } from "../stores";
  import { _ } from "svelte-i18n";

  import Placeholder from "../shared/Placeholder.svelte";

  let author = "";
  let coverImage = "";
  let downloadButtonLoading = false;
  let downloadButtonDisabled = true;
  
  $: {
    if (author.length == 0 && coverImage.length == 0) {
      downloadButtonDisabled = true;
    } else {
      downloadButtonDisabled = false;
    }
  }

  function download() {
    downloadButtonLoading = true;
    const file = cover.files[0];
    let generateDownload = new Export($state.currentProject, file, author);
    generateDownload
      .fetchTemplate()
      .then(() => {
        downloadButtonLoading = downloadButtonDisabled = false;
      })
      .finally(() => {
        generateDownload = null;
      });
  }

  function downloadRTF() {
    let generateDownload = new ExportRTF($state.currentProject, author);
    generateDownload
      .fetchTemplate()
      .then(() => {
        downloadButtonLoading = downloadButtonDisabled = false;
      })
      .finally(() => {
        generateDownload = null;
      });
  }
</script>

<style type="text/css">

</style>

{#if !window.hasOwnProperty("cordova")}
  {#if $state.currentProject}
    <h2>{$_('export.title')}</h2>
    <div class="btn-group">
      <button on:click={downloadRTF}>
        <span class="lnr lnr-sync spinner" />
        {$_('export.downloadRtf')}
      </button>
    </div>
    <hr />
    <div class="field">
      <label class="big" for="author">{$_('export.author')}</label>
      <input
        id="author"
        type="text"
        placeholder="John Doe"
        autocomplete="off"
        bind:value={author} />
    </div>
    <div class="field">
      <label class="big" for="cover">{$_('export.cover')}</label>
      <input id="cover" type="file" bind:files={coverImage} accept=".jpg,.jpeg" />
    </div>
    <div class="btn-group">
      <button
        on:click={download}
        disabled={downloadButtonDisabled}
        class:loading={downloadButtonLoading}>
        <span class="lnr lnr-sync spinner" />
        {$_('export.downloadEpub')}
      </button>
    </div>
  {:else}
    <Placeholder />
  {/if}
{:else}
  <i>Coming soon on mobile!</i>
{/if}
