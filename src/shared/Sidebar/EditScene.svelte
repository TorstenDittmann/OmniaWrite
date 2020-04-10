<script>
  import { createEventDispatcher } from "svelte";
  import { _ } from "svelte-i18n";
  import { push } from "svelte-spa-router";

  import { state, scenes } from "../../stores";

  import Modal from "../../shared/Modal.svelte";

  export let show;
  export let data;

  function editScene() {
    scenes.setSceneTitle(data.id, data.title);
    show = false;
  }

  function removeScene(sceneId) {
    let confirmed = confirm($_("overview.scene.confirmDelete"));
    if (confirmed == true) {
      show = false;
      push("/write");
      window.setTimeout(() => scenes.removeScene(sceneId), 200);
    }
  }
</script>

<style>

</style>

<Modal bind:show>
  <h2 slot="header">{data.title}</h2>
  <form on:submit|preventDefault={editScene}>
    <div class="field">
      <label for="editChapterInput">{$_("sidebar.modal.title")}</label>
      <input
        id="editChapterInput"
        bind:value={data.title}
        autocomplete="off"
        placeholder="enter your title"
        type="text" />
    </div>
    <br />
    <div class="btn-group">
      {#if data.title.length > 0}
        <button on:click={editScene} type="submit">
          {$_("sidebar.modal.edit.buttonSave")}
        </button>
      {/if}
      <button
        style="float: right;"
        class="warning"
        on:click={() => removeScene(data.id)}>
        {$_("sidebar.modal.edit.buttonDelete")}
      </button>
    </div>
  </form>
</Modal>
