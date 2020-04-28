<script>
  import { state } from "../../stores";
  import { _ } from "svelte-i18n";
  import saveAs from "file-saver";
  import Export from "./Cloud/index";

  let loading = false;
  let downloadButtonDisabled = true;
  let author = "";
  let cover = "";

  const getBase64 = file =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });

  const download = async () => {
    loading = true;
    const file = await getBase64(cover[0]);
    let generateDownload = new Export($state.currentProject, author);
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
            body: JSON.stringify({
              data: data,
              cover: {
                extension: file.substring(
                  "data:image/".length,
                  file.indexOf(";base64")
                ),
                type: file.substring("data:".length, file.indexOf(";base64")),
                data: file.replace(/^data:image.+;base64,/, "")
              }
            })
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
