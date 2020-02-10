<script>
  import { Export } from "../../export";
  import { state } from "../../stores";
  import { _ } from "svelte-i18n";

  let loading = false;
  let downloadButtonDisabled = true;
  let author = "";
  let coverImage = "";

  $: {
    if (author.length == 0 && coverImage.length == 0) {
      downloadButtonDisabled = true;
    } else {
      downloadButtonDisabled = false;
    }
  }

  function download() {
    loading = true;
    const file = cover.files[0];
    let generateDownload = new Export($state.currentProject, file, author);
    generateDownload
      .fetchTemplate()
      .then(() => {
        loading = downloadButtonDisabled = false;
      })
      .finally(() => {
        generateDownload = null;
      });
  }
</script>

<h2>{$_('export.title.epub')}</h2>
<div class="grid">
  <div>
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
      <input
        id="cover"
        type="file"
        bind:files={coverImage}
        accept=".jpg,.jpeg" />
    </div>
    <div class="btn-group">
      <button
        on:click={download}
        disabled={downloadButtonDisabled}
        class:loading>
        <span class="lnr lnr-sync spinner" />
        {$_('export.downloadEpub')}
      </button>
    </div>
  </div>
</div>
