<script>
  import { createEventDispatcher } from "svelte";
  import { _ } from "svelte-i18n";

  import { scenes } from "../../stores";

  import Modal from "../../shared/Modal.svelte";

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
    <div class="field">
      <label for="editChapterInput">{$_('sidebar.modal.title')}</label>
      <input
        id="editChapterInput"
        bind:value={title}
        autocomplete="off"
        placeholder="enter your title"
        type="text" />
    </div>
    <hr />
    <div class="btn-group">
      {#if title.length > 0}
        <button on:click|preventDefault={createScene}>
          {$_('sidebar.modal.newScene.button')}
        </button>
      {/if}
    </div>
  </form>
</Modal>
