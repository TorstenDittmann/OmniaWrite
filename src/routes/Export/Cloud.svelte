<script>
  import { get } from "svelte/store";
  import { fade } from "svelte/transition";
  import { _ } from "svelte-i18n";
  import { state, projects } from "../../stores";
  import { getBase64, toFileName } from "../../utils";
  import { saveFile } from "../../bridge";
  import {
    Input,
    Select,
    File,
    Button,
    ButtonGroup,
    Field,
  } from "../../components/Forms";
  import { Grid, GridElement } from "../../components/Grid";
  import Modal from "../../shared/Modal.svelte";
  import Toast from "../../shared/Toast.svelte";
  import Spinner from "../../shared/Spinner.svelte";
  import Done from "./Shared/Done.svelte";
  import Export from "./Cloud/collectData";

  let form = {
    title: "",
    author: "",
    description: "",
    publisher: "",
    lang: "en",
    template: "",
    ...get(projects).filter(p => p.id === $state.currentProject)[0],
  };

  let selectTemplate = false;

  let cover = [];

  let progress = {
    active: false,
    done: false,
    file: {},
  };

  let exportToast = false;
  let exportResponse = "";

  let completeForm = false;

  const exportApi = "https://app.omniawrite.com/api/export";

  const languages = ["en", "de", "ru", "es", "pt", "fr", "it"].map(language => {
    return {
      value: language,
      text: $_(`settings.appearance.language.${language}`),
    };
  });

  $: checkForm =
    form.title !== "" &&
    form.author !== "" &&
    form.description !== "" &&
    form.publisher !== "" &&
    form.lang !== "" &&
    form.template !== "" &&
    cover.length !== 0;

  const fetchTemplates = async () => {
    const req = await fetch("https://app.omniawrite.com/api/templates");
    return req.json();
  };

  const download = async () => {
    if (!checkForm) {
      completeForm = true;
      return;
    }
    progress.active = true;
    try {
      const file = await getBase64(cover[0]);
      const generateDownload = new Export($state.currentProject);
      const data = await generateDownload.fetchData();
      const response = await fetch(exportApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          template: form.template.id,
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
      });

      if (!response.ok) {
        throw new Error("Server response was invalid!");
      }

      const blob = await response.blob();
      const filename = toFileName(form.title);

      progress.file = await saveFile(blob, `${filename}.epub`);
      progress.done = true;
    } catch (error) {
      exportToast = true;
      exportResponse = error.message;

      progress.active = false;
    }
  };
</script>

<Toast bind:show={exportToast} text={exportResponse} />
<Toast bind:show={completeForm} text={$_('export.form')} />
<Modal bind:show={progress.active}>
  <h2 slot="header">{$_('export.progress')}</h2>
  <center>
    {#if progress.done}
      <Done file={progress.file} />
    {:else}
      <Spinner />
    {/if}
  </center>
</Modal>
<Modal bind:show={selectTemplate}>
  <h2 slot="header">{$_('export.templates')}</h2>
  {#await fetchTemplates()}
    <Spinner />
  {:then templates}
    <Grid>
      {#each templates as template}
        <GridElement
          on:click={() => ([form.template, selectTemplate] = [template, false])}>
          <h2>
            {#if form.template.id === template.id}
              <span class="lnr lnr-checkmark-circle" />
            {/if}
            {template.name}
          </h2>
        </GridElement>
      {/each}
    </Grid>
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
</Modal>
<div in:fade={{ duration: 100 }}>
  <Field label={$_('export.template')}>
    <ButtonGroup>
      <Button on:click={() => (selectTemplate = true)}>
        {#if form.template !== ''}
          <span class="lnr lnr-checkmark-circle" />
          {form.template.name}
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
</div>
