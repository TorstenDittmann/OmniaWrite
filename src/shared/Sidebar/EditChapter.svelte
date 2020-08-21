<script>
  import { _ } from "svelte-i18n";
  import { chapters } from "../../stores";
  import { Input, Button, ButtonGroup } from "../../components/Forms";
  import Modal from "../../shared/Modal.svelte";

  export let show;
  export let data;

  const editChapter = () => {
    chapters.setChapterTitle(data.id, data.title);
    show = false;
  };

  const removeChapter = chapterId => {
    let confirmed = confirm($_("sidebar.delete.chapter"));
    if (confirmed == true) {
      chapters.removeChapter(chapterId);
      show = false;
    }
  };
</script>

<Modal bind:show>
  <h2 slot="header">{$_('sidebar.editChapter')}</h2>
  <form on:submit|preventDefault={editChapter}>
    <Input
      label={$_('sidebar.modal.title')}
      bind:value={data.title}
      autocomplete="off"
      autofocus="true"
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

<style>

</style>
