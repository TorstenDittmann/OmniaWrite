<script>
  import { createEventDispatcher } from "svelte";
  import { _ } from "svelte-i18n";

  import { state, chapters } from "../../stores";

  import Modal from "../../shared/Modal.svelte";
  import Input from "../../components/Input.svelte";
  import ButtonGroup from "../../components/ButtonGroup.svelte";
  import Button from "../../components/Button.svelte";

  export let show;
  export let data;

  const editChapter = () => {
    chapters.setChapterTitle(data.id, data.title);
    show = false;
  };

  const removeChapter = (chapterId) => {
    let confirmed = confirm($_("sidebar.delete.chapter"));
    if (confirmed == true) {
      chapters.removeChapter(chapterId);
      show = false;
    }
  };
</script>

<style>

</style>

<Modal bind:show>
  <h2 slot="header">{data.title}</h2>
  <form on:submit|preventDefault={editChapter}>
    <Input
      label={$_('sidebar.modal.title')}
      bind:value={data.title}
      autocomplete="off"
      placeholder={$_('placeholder.title')} />

    <ButtonGroup>
      <Button on:click={editChapter} disabled={data.title.length === 0}>
        {$_('sidebar.modal.edit.buttonSave')}
      </Button>
      <Button on:click={() => removeChapter(data.id)} color="red">
        {$_('sidebar.modal.edit.buttonDelete')}
      </Button>
    </ButtonGroup>
  </form>
</Modal>
