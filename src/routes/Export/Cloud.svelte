<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { _ } from "svelte-i18n";
  import { state } from "../../stores";
  import { getBase64 } from "../../utils";
  import saveAs from "file-saver";
  import {
    Input,
    Select,
    File,
    Button,
    ButtonGroup,
    Field,
  } from "../../components/Forms";
  import { Grid, GridElement } from "../../components/Grid";

  import Placeholder from "../../shared/Placeholder.svelte";
  import Modal from "../../shared/Modal.svelte";
  import Toast from "../../shared/Toast.svelte";
  import Spinner from "../../shared/Spinner.svelte";
  import Export from "./Cloud/collectData";

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

  let templates = [];

  const languages = ["en", "de", "ru", "es", "pt", "fr", "uk"].map(
    (language) => {
      return {
        value: language,
        text: $_(`settings.appereance.language.${language}`),
      };
    }
  );

  $: checkForm =
    form.title !== "" &&
    form.author !== "" &&
    form.description !== "" &&
    form.publisher !== "" &&
    form.lang !== "" &&
    form.template !== "" &&
    cover.length !== 0;

  onMount(async () => {
    const req = await fetch(
      "https://omniawrite-git-11.torstendittmann.now.sh/api/templates"
    );
    templates = await req.json();
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
    const data = await generateDownload.fetchData();
    let filename;
    progress.state = "sending data to server";
    fetch(exportApi, {
      method: "POST",
      cache: "no-cache",
      mode: "same-origin",
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
  <Grid>
    {#each templates as template}
      <GridElement
        on:click={() => ([form.template, selectTemplate] = [template.id, false])}>
        <h2>
          {#if form.template === template.id}
            <span class="lnr lnr-checkmark-circle" />
          {/if}
          {template.name}
        </h2>
      </GridElement>
    {/each}
  </Grid>
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
