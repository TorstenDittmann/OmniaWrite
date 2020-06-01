<script>
  import { createEventDispatcher } from "svelte";
  import { _ } from "svelte-i18n";

  import { projects } from "../../stores";

  import Modal from "../../shared/Modal.svelte";

  import Input from "../../components/Input.svelte";
  import ButtonGroup from "../../components/ButtonGroup.svelte";
  import Button from "../../components/Button.svelte";

  const dispatch = createEventDispatcher();

  export let showCreateProject = false;

  let value = "";

  const createProject = () => {
    if (value.length > 0) {
      let retValue = projects.createProject(value);
      showCreateProject = false;
      dispatch("changeProject", {
        project: retValue,
      });
    }
  };
</script>

<style>

</style>

<Modal bind:show={showCreateProject}>
  <h2 slot="header">{$_('overview.modals.newProject.header')}</h2>
  <form on:submit|preventDefault={createProject}>
    <Input
      label={$_('overview.modals.newProject.title')}
      bind:value
      autofocus="true"
      autocomplete="off"
      placeholder={$_('placeholder.title')} />
    <ButtonGroup>
      <Button on:click={createProject} disabled={value.length === 0}>
        {$_('overview.modals.newProject.button')}
      </Button>
    </ButtonGroup>
  </form>
</Modal>
