<script lang="javascript">
  import { fade } from "svelte/transition";
  import { state } from "../stores";
  import { _ } from "svelte-i18n";

  import Placeholder from "../shared/Placeholder.svelte";
  import Export from "./Export/Cloud/index";
  import saveAs from "file-saver";

  let form = {
    title: "",
    author: "",
    description: "",
    publisher: "",
    lang: "",
    cover: "",
    template: ""
  };

  let loading = false;

  const getBase64 = file =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });

  const download = async () => {
    loading = true;
    const file = await getBase64(form.cover[0]);
    let generateDownload = new Export($state.currentProject);
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

<div class="export-container" in:fade={{ duration: 100 }}>
  {#if $state.currentProject}
    <div class="header">
      <div class="btn-group export-action">
        <button on:click|preventDefault={download}>
          {$_("exports.action")}
        </button>
      </div>
    </div>
    <div class="sidebar">
      <div class="field vertical">
        <label class="big" for="title">{$_('export.title')}</label>
        <input
          id="title"
          type="text"
          placeholder="Moby Dick"
          bind:value={form.title}
          autocomplete="off" />
      </div>
      <div class="field vertical">
        <label class="big" for="author">{$_('export.author')}</label>
        <input
          id="author"
          type="text"
          placeholder="John Doe"
          bind:value={form.author}
          autocomplete="off" />
      </div>
      <div class="field vertical">
        <label class="big" for="publisher">{$_('export.publisher')}</label>
        <input
          id="publisher"
          type="text"
          placeholder="John Doe"
          bind:value={form.publisher}
          autocomplete="off" />
      </div>
      <div class="field vertical">
        <label class="big" for="language">{$_('export.language')}</label>
        <input
          id="language"
          type="text"
          placeholder="John Doe"
          bind:value={form.lang}
          autocomplete="off" />
      </div>
      <div class="field vertical">
        <label class="big" for="description">{$_('export.description')}</label>
        <input
          id="description"
          type="text"
          placeholder="John Doe"
          bind:value={form.description}
          autocomplete="off" />
      </div>
      <div class="field vertical">
        <label class="big" for="cover">{$_('export.cover')}</label>
        <input
          id="cover"
          bind:files={form.cover}
          type="file" />
      </div>
    </div>
    <div class="templates">
      <div class="cover">
        <img src="https://via.placeholder.com/260x440?text=Cover" alt="" />
      </div>
      <div class="cover">
        <img src="https://via.placeholder.com/260x440?text=Cover" alt="" />
      </div>
      <div class="cover">
        <img src="https://via.placeholder.com/260x440?text=Cover" alt="" />
      </div>
      <div class="cover">
        <img src="https://via.placeholder.com/260x440?text=Cover" alt="" />
      </div>
      <div class="cover">
        <img src="https://via.placeholder.com/260x440?text=Cover" alt="" />
      </div>
      <div class="cover">
        <img src="https://via.placeholder.com/260x440?text=Cover" alt="" />
      </div>
            <div class="cover">
        <img src="https://via.placeholder.com/260x440?text=Cover" alt="" />
      </div>
    </div>
  {:else}
    <Placeholder />
  {/if}
</div>

<style type="text/css">
  .header, .sidebar {
    background-color: var(--background-color);
  }
  .header {
    top: 0;
    padding: .5rem 0;
    position: sticky;
    z-index: 2;
  }

  .btn-group {
    margin: 0;
  }
  
  .templates {
    grid-area: export-templates;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .cover {
    flex: 0 0 50%;
  }

  .cover img {
    max-width:90%;
    margin: .5rem;
  }

  @media (min-width: 960px) {
    .export-container {
      margin: auto;
      max-width: 800px;
      display: grid;
      grid-template-columns: 1fr 4fr;
      grid-template-rows: 4rem auto;
      grid-template-areas:
        "export-header export-header"
        "export-sidebar export-templates";
    }

    .header {
      grid-area: export-header;
      position: sticky;
      top: 0;
      display: flex;
      flex-direction: row-reverse;
    }

    .sidebar {
      grid-area: export-sidebar;
      position: sticky;
      top: 4rem;
      height: fit-content;
    }

    .export-action {
      margin: auto 0;
    }

    .btn-group button {
      width: 100%;
    }
  }
</style>