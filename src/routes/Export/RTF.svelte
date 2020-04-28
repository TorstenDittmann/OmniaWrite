<script>
  import { state } from "../../stores";
  import { _ } from "svelte-i18n";
  import Export from "./RTF/index";

  let loading = false;

  const download = () => {
    loading = true;
    let generateDownload = new Export($state.currentProject, author);
    generateDownload
      .fetchTemplate()
      .then(() => {
        loading = false;
      })
      .finally(() => {
        generateDownload = null;
      });
  };
</script>

<h2>{$_('export.title.rtf')}</h2>
<div class="grid">
  <div on:click={download}>
    {#if loading}
      <span class="lnr lnr-sync spinner loading" />
    {:else}
      {$_('export.downloadRtf')}
      <span class="lnr lnr-download" />
    {/if}
  </div>
</div>
