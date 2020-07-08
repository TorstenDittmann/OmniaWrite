<script>
  import { createEventDispatcher } from "svelte";
  import { _ } from "svelte-i18n";
  import { state, chapters } from "../../stores";
  import { Input, Button, ButtonGroup } from "../../components/Forms";

  import Modal from "../Modal.svelte";

  export let show;

  let title = "";

  const createChapter = () => {
    chapters.createChapter($state.currentProject, title);
    show = false;
    title = "";
  };
</script>

<style>

</style>

<Modal bind:show>
  <h2 slot="header">{$_('sidebar.modal.newChapter.header')}</h2>
  <form on:submit|preventDefault={createChapter}>
    <Input
      label={$_('sidebar.modal.title')}
      bind:value={title}
      autofocus="true"
      autocomplete="off"
      placeholder={$_('placeholder.title')} />
    <ButtonGroup>
      <Button on:click={createChapter} disabled={title.length === 0}>
        {$_('sidebar.modal.newChapter.button')}
      </Button>
    </ButtonGroup>
  </form>
</Modal>
