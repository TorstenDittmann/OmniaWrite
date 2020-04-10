<script>
  import { createEventDispatcher } from "svelte";
  import { _ } from "svelte-i18n";

  import { state, chapters } from "../../stores";

  import Modal from "../../shared/Modal.svelte";

  export let show;

  let title = "";
  function createChapter() {
    chapters.createChapter($state.currentProject, title);
    show = false;
    title = "";
  }
</script>

<style>

</style>

<Modal bind:show>
  <h2 slot="header">{$_("sidebar.modal.newChapter.header")}</h2>
  <form on:submit|preventDefault={createChapter}>
    <div class="field">
      <label for="createChapterInput">{$_("sidebar.modal.title")}</label>
      <input
        id="createChapterInput"
        bind:value={title}
        autocomplete="off"
        placeholder="enter your title"
        type="text" />
    </div>
    <hr />
    <div class="btn-group">
      {#if title.length > 0}
        <button on:click|preventDefault={createChapter}>
          {$_("sidebar.modal.newChapter.button")}
        </button>
      {/if}
    </div>
  </form>
</Modal>
