<script lang="javascript">
  import { state, chapters, scenes } from "../stores";
  import { link, push, replace } from "svelte-spa-router";
  import { fade, fly } from "svelte/transition";
  import { _ } from "svelte-i18n";

  import Modal from "./Modal.svelte";
  import Placeholder from "./Placeholder.svelte";
  import active from "svelte-spa-router/active";

  export let sidebarState;

  let showCreateChapter = false;
  let createChapterTitle;

  function createChapter() {
    chapters.createChapter($state.currentProject, createChapterTitle);
    showCreateChapter = false;
    createChapterTitle = "";
  }

  let createSceneTitle;
  let createSceneChapter;
  let showCreateScene = false;

  function openCreateScene(chapter) {
    createSceneChapter = chapter;
    showCreateScene = true;
  }

  function createScene() {
    scenes.createScene(createSceneChapter, createSceneTitle);
    showCreateScene = false;
    createSceneTitle = "";
  }

  let showEditChapter = false;
  let objEditChapter;

  function editChapter() {
    chapters.setChapterTitle(objEditChapter.id, objEditChapter.title);
    showEditChapter = false;
  }

  let showEditScene = false;
  let objEditScene;

  function editScene() {
    scenes.setSceneTitle(objEditScene.id, objEditScene.title);
    showEditScene = false;
  }
</script>

<style type="text/css">
  .swap-list {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  .swap-list > li {
    padding: 0.5rem 0 0.5rem 2rem;
  }

  .swap-list > li .action {
    cursor: pointer;
    opacity: 0.65;
  }

  .swap-list > li .action:hover {
    opacity: 1;
  }

  .swap-list li:first-child .lnr-chevron-up {
    visibility: hidden;
  }

  .swap-list li:last-child .lnr-chevron-down {
    visibility: hidden;
  }
</style>

<Modal bind:show={showCreateChapter}>
  <h2 slot="header">{$_('sidebar.modal.newChapter.header')}</h2>
  <div class="field">
    <label for="editChapterInput">{$_('sidebar.modal.title')}</label>
    <input
      id="editChapterInput"
      bind:value={createChapterTitle}
      autocomplete="off"
      placeholder="enter your title"
      type="text" />
  </div>
  <hr />
  <div class="btn-group">
    {#if createChapterTitle.length > 0}
      <button on:click={createChapter}>
        {$_('sidebar.modal.newChapter.button')}
      </button>
    {/if}
  </div>
</Modal>

<Modal bind:show={showCreateScene}>
  <h2 slot="header">{$_('sidebar.modal.newScene.header')}</h2>
  <div class="field">
    <label for="editChapterInput">{$_('sidebar.modal.title')}</label>
    <input
      id="editChapterInput"
      bind:value={createSceneTitle}
      autocomplete="off"
      placeholder="enter your title"
      type="text" />
  </div>
  <hr />
  <div class="btn-group">
    {#if createSceneTitle.length > 0}
      <button on:click={createScene}>
        {$_('sidebar.modal.newScene.button')}
      </button>
    {/if}
  </div>
</Modal>

<Modal bind:show={showEditChapter}>
  <h2 slot="header">{objEditChapter.title}</h2>
  <h3>Edit</h3>
  <div class="field">
    <label for="editChapterInput">{$_('sidebar.modal.title')}</label>
    <input
      id="editChapterInput"
      bind:value={objEditChapter.title}
      autocomplete="off"
      placeholder="enter your title"
      type="text" />
  </div>
  <h3>{$_('sidebar.modal.edit.order')}</h3>
  <ul class="swap-list">
    {#each $scenes
      .filter(scene => scene.chapter == objEditChapter.id)
      .sort((a, b) => a.order - b.order) as scene}
      <li>
        <span
          class="lnr lnr-chevron-up action"
          on:click={() => {
            scenes.orderScene(scene.id, true);
          }} />
        <span
          class="lnr lnr-chevron-down action"
          on:click={() => {
            scenes.orderScene(scene.id, false);
          }} />
        <span>{scene.title}</span>
      </li>
    {/each}
  </ul>
  <div class="btn-group">
    {#if objEditChapter.title.length > 0}
      <button on:click={editChapter}>
        {$_('sidebar.modal.edit.buttonSave')}
      </button>
    {/if}
    <button
      style="float: right;"
      class="warning"
      on:click={() => {
        chapters.removeChapter(objEditChapter.id);
        showEditChapter = false;
      }}>
      {$_('sidebar.modal.edit.buttonDelete')}
    </button>
  </div>
</Modal>

<Modal bind:show={showEditScene}>
  <h2 slot="header">{objEditScene.title}</h2>
  <div class="field">
    <label for="editChapterInput">{$_('sidebar.modal.title')}</label>
    <input
      id="editChapterInput"
      bind:value={objEditScene.title}
      autocomplete="off"
      placeholder="enter your title"
      type="text" />
  </div>
  <br />
  <div class="btn-group">
    {#if objEditScene.title.length > 0}
      <button on:click={editScene}>
        {$_('sidebar.modal.edit.buttonSave')}
      </button>
    {/if}
    <button
      style="float: right;"
      class="warning"
      on:click={() => {
        showEditScene = false;
        push('/write');
        window.setTimeout(() => scenes.removeScene(objEditScene.id), 200);
      }}>
      {$_('sidebar.modal.edit.buttonDelete')}
    </button>
  </div>
</Modal>

{#if sidebarState}
  <div
    id="sidebar"
    class="navigation noselect"
    class:active={sidebarState}
    in:fly={{ y: 200, duration: 200 }}
    out:fly={{ y: 200, duration: 200 }}>
    <ul class="menu">
      <div
        class="backdrop"
        on:click={() => (sidebarState = false)}
        data-deskgap-no-drag />
      <div
        id="close-sidebar"
        class="close"
        on:click={() => (sidebarState = false)}
        data-deskgap-no-drag>
        <span class="lnr lnr-cross" />
      </div>
      {#if $state.currentProject}
        {#each $chapters.filter(chapter => chapter.project == $state.currentProject) as chapter, i}
          <li class="parent" class:open={chapter.ui.open}>
            <span
              class="key"
              on:click={() => chapters.toggleChapterInSidebar(chapter.id)}>
              {chapter.title}
              <span class="lnr lnr-chevron-up collapse" />
              <span
                class="lnr lnr-cog action"
                on:click={() => ([showEditChapter, objEditChapter] = [true, chapter])} />
            </span>
            <ul>
              {#each $scenes
                .filter(scene => scene.chapter == chapter.id)
                .sort((a, b) => a.order - b.order) as scene}
                <li
                  use:active={'/write/' + scene.id}
                  on:click={() => push('/write/' + scene.id)}>
                  <a href="/write/{scene.id}" use:link>{scene.title}</a>
                  <span
                    class="lnr lnr-cog action"
                    on:click={() => ([showEditScene, objEditScene] = [true, scene])} />
                </li>
              {/each}
              <li>
                <button on:click={() => openCreateScene(chapter.id)}>
                  <span class="lnr lnr-plus-circle" />
                  {$_('sidebar.createScene')}
                </button>
              </li>
            </ul>
          </li>
        {/each}
        <hr class="divider" />
        <li class="parent">
          <span class="key" on:click={() => (showCreateChapter = true)}>
            <span class="lnr lnr-plus-circle collapse" />
            {$_('sidebar.createChapter')}
          </span>
        </li>
      {:else}
        <Placeholder />
      {/if}
    </ul>
  </div>
{/if}
