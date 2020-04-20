<script>
  import { ExportJSON } from "../../export";
  import { state } from "../../stores";
  import { _ } from "svelte-i18n";
  import saveAs from "file-saver";

  let loading = false;
  let downloadButtonDisabled = true;
  let author = "";
  let cover = "";

  async function postData(url = "", data = {}) {
    // Default options are marked with *
    return await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "no-cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
      .then(response => {
        console.log("huhu");
        console.log(response.headers);
        return response.blob();
      })
      .then(blob => {
        console.log(blob);
      });
  }

  const download = async () => {
    loading = true;
    const file = cover[0];
    let generateDownload = new ExportJSON($state.currentProject, author, file);
    generateDownload
      .fetchTemplate()
      .then(data => {
        let filename = "no title";
        fetch(
          "https://omniawrite-git-cloud-export.torstendittmann.now.sh/api/export",
          {
            method: "POST",
            mode: "same-origin",
            cache: "no-cache",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ data: data })
          }
        )
          .then(response => {
            filename = response.headers
              .get("Content-Disposition")
              .split('"')[1];
            return response.blob();
          })
          .then(blob => {
            saveAs.saveAs(blob, filename);
          });
        loading = false;
      })
      .finally(() => {
        generateDownload = null;
      });
  };
</script>

<h2>Cloud</h2>
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
        bind:files={cover}
        accept=".jpg,.jpeg,.png" />
    </div>
    <div class="btn-group">
      <button on:click={download} class:loading>
        <span class="lnr lnr-sync spinner" />
        {$_('export.downloadEpub')}
      </button>
    </div>
  </div>
</div>
