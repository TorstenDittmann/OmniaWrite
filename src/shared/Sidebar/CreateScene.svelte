<script>
  import { createEventDispatcher } from "svelte";
  import { _ } from "svelte-i18n";

  import { scenes } from "../../stores";

  import Modal from "../../shared/Modal.svelte";
  import Input from "../../components/Input.svelte";
  import ButtonGroup from "../../components/ButtonGroup.svelte";
  import Button from "../../components/Button.svelte";

  export let show;
  export let chapter;

  let title = "";

  const createScene = () => {
    scenes.createScene(chapter, title);
    show = false;
    title = "";
  };
</script>

<style>

</style>

<Modal bind:show>
  <h2 slot="header">{$_('sidebar.modal.newScene.header')}</h2>
  <form on:submit|preventDefault={createScene}>
    <Input
      label={$_('sidebar.modal.title')}
      bind:value={title}
      autofocus="true"
      autocomplete="off"
      placeholder={$_('placeholder.title')} />
    <ButtonGroup>
      <Button on:click={createScene} disabled={title.length === 0}>
        {$_('sidebar.modal.newScene.button')}
      </Button>
    </ButtonGroup>
  </form>
</Modal>
