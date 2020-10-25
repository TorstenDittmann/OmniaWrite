<script>
  import { createEventDispatcher } from "svelte";
  import { _ } from "svelte-i18n";
  import { projects } from "../../stores";
  import { Input, ButtonGroup, Button, Select } from "../../components/Forms";

  import Modal from "../../shared/Modal.svelte";

  const dispatch = createEventDispatcher();

  export let showCreateProject = false;

  let form = {
    title: "",
    author: "",
    description: "",
    publisher: "",
    language: "",
  };

  $: checkForm = form.title !== "";

  const createProject = () => {
    if (!checkForm) return false;

    let id = projects.createProject(...Object.values(form));
    showCreateProject = false;
    dispatch("changeProject", {
      project: id,
    });
  };

  const languages = ["en", "de", "ru", "es", "pt", "fr", "it"].map(language => {
    return {
      value: language,
      text: $_(`settings.appearance.language.${language}`),
    };
  });
</script>

<Modal bind:show={showCreateProject}>
  <h2 slot="header">{$_('overview.modals.newProject.header')}</h2>
  <form on:submit|preventDefault={createProject}>
    <Input
      label={$_('export.title')}
      bind:value={form.title}
      autofocus="true"
      autocomplete="off"
      placeholder={$_('placeholder.title')} />
    <Input
      label={$_('export.author')}
      bind:value={form.author}
      placeholder="John Doe"
      autocomplete="off" />
    <Input
      label={$_('export.publisher')}
      bind:value={form.publisher}
      autocomplete="off"
      placeholder="OmniaWrite"
      helper={$_('export.helpers.publisher')} />
    <Select
      label={$_('export.language')}
      bind:value={form.language}
      options={languages}
      required="true"
      helper={$_('export.helpers.language')} />
    <Input
      label={$_('export.description')}
      placeholder="This book is awesome..."
      bind:value={form.description}
      helper={$_('export.helpers.description')} />
    <ButtonGroup>
      <Button on:click={createProject} disabled={!checkForm}>
        {$_('overview.modals.newProject.button')}
      </Button>
    </ButtonGroup>
  </form>
</Modal>
