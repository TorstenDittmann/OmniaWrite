<script lang="javascript">
  import { fade } from "svelte/transition";
  import { state } from "../stores";
  import { _ } from "svelte-i18n";
  import saveAs from "file-saver";

  import Placeholder from "../shared/Placeholder.svelte";
  import Modal from "../shared/Modal.svelte";
  import Toast from "../shared/Toast.svelte";
  import Spinner from "../shared/Spinner.svelte";
  import Export from "./Export/Cloud/index";

  import Input from "../components/Input.svelte";
  import Select from "../components/Select.svelte";
  import File from "../components/File.svelte";

  let form = {
    title: "",
    author: "",
    description: "",
    publisher: "",
    lang: "en",
    template: "epub3",
  };

  let cover = [];

  let progress = {
    active: false,
    state: "...",
  };

  let completeForm = false;

  const templates = [
    {
      id: "epub3",
      name: "Simple",
    },
    {
      id: "scifi",
      name: "Science Fiction",
    },
  ];

  const languages = [
    {
      value: "en",
      text: $_("settings.appereance.language.en"),
    },
    {
      value: "de",
      text: $_("settings.appereance.language.de"),
    },
  ];

  const checkForm = () =>
    form.title !== "" &&
    form.author !== "" &&
    form.description !== "" &&
    form.publisher !== "" &&
    form.lang !== "" &&
    form.template !== "" &&
    cover.length !== 0;

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const download = async () => {
    if (!checkForm()) {
      completeForm = true;
      return;
    }
    progress.active = true;
    const file = await getBase64(cover[0]);
    progress.state = "starting :)";
    let generateDownload = new Export($state.currentProject);
    generateDownload
      .fetchTemplate()
      .then((data) => {
        let filename;
        progress.state = "sending data to server";
        fetch("https://omniawrite-git-11.torstendittmann.now.sh/api/export", {
          method: "POST",
          mode: "same-origin",
          cache: "no-cache",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...form,
            data: data,
            cover: {
              extension: file.substring(
                "data:image/".length,
                file.indexOf(";base64")
              ),
              type: file.substring("data:".length, file.indexOf(";base64")),
              data: file.replace(/^data:image.+;base64,/, ""),
            },
          }),
        })
          .then((response) => {
            progress.state = "receiving data from server";
            filename = response.headers
              .get("Content-Disposition")
              .split('"')[1];
            return response.blob();
          })
          .then((blob) => {
            progress.state = "preparing epub";
            saveAs.saveAs(blob, filename + ".epub");
            progress.active = false;
          });
      })
      .finally(() => {
        generateDownload = null;
      });
  };
</script>

<style type="text/css">
  .header,
  .sidebar {
    background-color: var(--background-color);
  }
  .header {
    top: 0;
    padding: 0.5rem 0;
    position: sticky;
    z-index: 2;
  }

  .btn-group {
    margin: 0;
  }

  .templates {
    grid-area: export-templates;
  }

  @media (min-width: 960px) {
    .export-container {
      margin: auto;
      max-width: 960px;
      display: grid;
      grid-template-columns: 2fr 3fr;
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

<Toast bind:show={completeForm} text={$_('export.form')} />
<Modal bind:show={progress.active}>
  <center>
    <Spinner />
    <br />
    <i>{progress.state}</i>
  </center>
</Modal>
<div class="export-container" in:fade={{ duration: 100 }}>
  {#if $state.currentProject}
    <div class="header">
      <div class="btn-group export-action">
        <button on:click|preventDefault={download}>
          {$_('export.action')}
        </button>
      </div>
    </div>
    <div class="sidebar">
      <Input
        label={$_('export.title')}
        placeholder="Moby Dick"
        bind:value={form.title} />
      <Input
        label={$_('export.author')}
        placeholder="John Doe"
        bind:value={form.author} />
      <Input
        label={$_('export.publisher')}
        placeholder="OmniaWrite"
        bind:value={form.publisher} />
      <Select
        label={$_('export.language')}
        bind:value={form.lang}
        options={languages} />
      <Input
        label={$_('export.description')}
        placeholder="This book is awesome..."
        bind:value={form.description} />
      <File label={$_('export.cover')} bind:files={cover} />
    </div>
    <div class="templates">
      <div id="cards" class="grid">
        {#each templates as template}
          <div id="card" on:click={() => (form.template = template.id)}>
            <h2>
              {#if form.template === template.id}
                <span class="lnr lnr-checkmark-circle" />
              {/if}
              {template.name}
            </h2>
            <small>...</small>
          </div>
        {/each}
        <div id="card">
          <small>more coming soon</small>
        </div>
      </div>
    </div>
  {:else}
    <Placeholder />
  {/if}
</div>
