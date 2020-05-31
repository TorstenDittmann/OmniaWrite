<script>
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
  import ButtonGroup from "../components/ButtonGroup.svelte";
  import Button from "../components/Button.svelte";
  import Field from "../components/shared/Field.svelte";

  let form = {
    title: "",
    author: "",
    description: "",
    publisher: "",
    lang: "en",
    template: "",
  };

  let selectTemplate = false;

  let cover = [];

  let progress = {
    active: false,
    state: "...",
  };

  let exportToast = false;
  let exportResponse = "";

  let completeForm = false;

  const exportApi =
    "https://omniawrite-git-11.torstendittmann.now.sh/api/export";

  const templates = [
    {
      id: "epub3",
      name: "Simple",
    },
    {
      id: "modern",
      name: "Modern",
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

  $: checkForm =
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
    if (!checkForm) {
      completeForm = true;
      return;
    }
    progress.active = true;
    const file = await getBase64(cover[0]);
    progress.state = "starting :)";
    let generateDownload = new Export($state.currentProject);
    const data = await generateDownload.fetchTemplate();
    let filename;
    progress.state = "sending data to server";
    fetch(exportApi, {
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
        if (!response.ok) {
          throw new Error("Server response was invalid!");
        }
        progress.state = "receiving data from server";
        filename = response.headers.get("Content-Disposition").split('"')[1];
        return response.blob();
      })
      .then((blob) => {
        progress.state = "preparing epub";
        if (!filename.endsWith(".epub")) {
          filename = `${filename}.epub`;
        }
        saveAs.saveAs(blob, filename);
        progress.active = false;
      })
      .catch((error) => {
        exportToast = true;
        exportResponse = error.message;

        progress.active = false;
        generateDownload = null;
      });
  };
</script>

<Toast bind:show={exportToast} text={exportResponse} />
<Toast bind:show={completeForm} text={$_('export.form')} />
<Modal bind:show={progress.active}>
  <center>
    <Spinner />
    <br />
    <i>{progress.state}</i>
  </center>
</Modal>
<Modal bind:show={selectTemplate}>
  <h2>{$_('export.templates')}</h2>
  <div id="cards" class="grid">
    {#each templates as template}
      <div
        on:click={() => ([form.template, selectTemplate] = [template.id, false])}>
        <h2>
          {#if form.template === template.id}
            <span class="lnr lnr-checkmark-circle" />
          {/if}
          {template.name}
        </h2>
        <small>...</small>
      </div>
    {/each}
  </div>
</Modal>
<div in:fade={{ duration: 100 }}>
  {#if $state.currentProject}
    <Field label={$_('export.template')}>
      <ButtonGroup>
        <Button on:click={() => (selectTemplate = true)}>
          {#if form.template !== ''}
            <span class="lnr lnr-checkmark-circle" />
            {#each templates.filter((t) => t.id === form.template) as template}
              {template.name}
            {/each}
          {:else}{$_('export.action.choose')}{/if}
        </Button>
      </ButtonGroup>
    </Field>
    <Input
      label={$_('export.title')}
      placeholder="Moby Dick"
      bind:value={form.title}
      required="true"
      helper={$_('export.helpers.title')} />
    <Input
      label={$_('export.author')}
      placeholder="John Doe"
      bind:value={form.author}
      required="true"
      helper={$_('export.helpers.author')} />
    <Input
      label={$_('export.publisher')}
      placeholder="OmniaWrite"
      bind:value={form.publisher}
      required="true"
      helper={$_('export.helpers.publisher')} />
    <Select
      label={$_('export.language')}
      bind:value={form.lang}
      options={languages}
      required="true"
      helper={$_('export.helpers.language')} />
    <Input
      label={$_('export.description')}
      placeholder="This book is awesome..."
      bind:value={form.description}
      required="true"
      helper={$_('export.helpers.description')} />
    <File
      label={$_('export.cover')}
      bind:files={cover}
      required="true"
      helper={$_('export.helpers.cover')} />
    <ButtonGroup>
      <Button on:click={download} disabled={!checkForm}>
        {$_('export.action.export')}
      </Button>
    </ButtonGroup>
  {:else}
    <Placeholder />
  {/if}
</div>
