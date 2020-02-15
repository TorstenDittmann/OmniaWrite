<script>
  import { createEventDispatcher } from "svelte";
  import { _ } from "svelte-i18n";

  import { state, chapters } from "../../stores";

  import Modal from "../../shared/Modal.svelte";

  export let show;
  export let data;

  function editChapter() {
    chapters.setChapterTitle(data.id, data.title);
    show = false;
  }

  function removeChapter(chapterId) {
    let confirmed = confirm($_("overview.chapter.confirmDelete"));
    if (confirmed == true) {
      chapters.removeChapter(chapterId);
      show = false;
    }
  }
</script>

<style>

</style>

<Modal bind:show>
  <h2 slot="header">{data.title}</h2>
  <form on:submit|preventDefault={editChapter}>
    <div class="field">
      <label for="editChapterInput">{$_('sidebar.modal.title')}</label>
      <input
        id="editChapterInput"
        bind:value={data.title}
        autocomplete="off"
        placeholder="enter your title"
        type="text" />
    </div>
    <div class="btn-group">
      {#if data.title.length > 0}
        <button on:click={editChapter} type="submit">
          {$_('sidebar.modal.edit.buttonSave')}
        </button>
      {/if}
      <button
        style="float: right;"
        class="warning"
        on:click={() => removeChapter(data.id)}>
        {$_('sidebar.modal.edit.buttonDelete')}
      </button>
    </div>
  </form>
</Modal>
