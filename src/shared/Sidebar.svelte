<script>
  import { state, chapters, scenes } from "../stores";
  import { onMount } from "svelte";
  import { link, push, replace } from "svelte-spa-router";
  import { fade, fly } from "svelte/transition";
  import { _ } from "svelte-i18n";
  import tippy from "sveltejs-tippy";

  import Modal from "./Modal.svelte";
  import Placeholder from "./Placeholder.svelte";
  import active from "svelte-spa-router/active";

  import ButtonGroup from "../components/Forms/ButtonGroup.svelte";
  import Button from "../components/Forms/Button.svelte";

  import CreateChapter from "./Sidebar/CreateChapter.svelte";
  import CreateScene from "./Sidebar/CreateScene.svelte";
  import EditChapter from "./Sidebar/EditChapter.svelte";
  import EditScene from "./Sidebar/EditScene.svelte";
  import ReArrange from "./Sidebar/ReArrange.svelte";
  import Scene from "./Sidebar/Scene.svelte";
  import Chapter from "./Sidebar/Chapter.svelte";
  import Backdrop from "./Sidebar/Backdrop.svelte";
  import Close from "./Sidebar/Close.svelte";
  import EditProject from "./Sidebar/EditProject.svelte";

  export let sidebarState;

  const modals = {
    reArrange: false,
    createChapter: false,
    editProject: false,
    createScene: {
      show: false,
      chapter: "",
    },
    editChapter: {
      show: false,
      data: {},
    },
    editScene: {
      show: false,
      data: {},
    },
  };

  const createScene = (chapter) => {
    modals.createScene.chapter = chapter;
    modals.createScene.show = true;
  };

  const editChapter = (event) => {
    modals.editChapter.data = event.detail;
    modals.editChapter.show = true;
  };

  const editScene = (event) => {
    modals.editScene.data = event.detail;
    modals.editScene.show = true;
  };
</script>

<style lang="scss">
  @import "../css/mixins/devices";

  .sidebar {
    scrollbar-color: rgb(13, 19, 22) rgb(25, 38, 44);
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    width: 100%;
    visibility: hidden;
    position: absolute;
    top: 0;
    z-index: 10;

    @include desktop {
      background-color: var(--secondary-color);
      top: 0;
      position: initial;
      visibility: initial;
      height: calc(100vh - 6rem);
      grid-area: sidebar;
    }

    &.active {
      visibility: visible;
    }

    .actions {
      height: 4rem;
      background-color: var(--secondary-color);
      width: 70%;
      display: flex;
      justify-content: space-around;
      -webkit-box-shadow: 0 -1px 8px 0 rgba(0, 0, 0, 0.65);
      box-shadow: 0 -1px 8px 0 rgba(0, 0, 0, 0.65);
      z-index: 10;
      @include desktop {
        width: 100%;
      }

      div {
        margin: auto;
        cursor: pointer;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0.65;

        &:hover {
          opacity: 1;
          background-color: var(--menu-hover);
        }
      }
    }

    ul.menu {
      background-color: var(--background-color);
      margin: 0;
      padding: 0;
      width: 70%;
      height: calc(100vh - 4rem);
      float: left;
      overflow-y: auto;

      @include desktop {
        width: 100%;
        overflow-y: auto;
        background-color: var(--secondary-color);
      }
    }
  }
</style>

{#if modals.reArrange}
  <ReArrange bind:show={modals.reArrange} />
{/if}

{#if modals.editProject}
  <EditProject bind:show={modals.editProject} id={$state.currentProject} />
{/if}
<CreateChapter bind:show={modals.createChapter} />
<CreateScene
  bind:show={modals.createScene.show}
  bind:chapter={modals.createScene.chapter} />
<EditChapter
  bind:show={modals.editChapter.show}
  bind:data={modals.editChapter.data} />
<EditScene
  bind:show={modals.editScene.show}
  bind:data={modals.editScene.data} />

{#if sidebarState}
  <div
    class="sidebar"
    class:active={sidebarState}
    in:fly={{ y: 200, duration: 200 }}
    out:fly={{ y: 200, duration: 200 }}>
    <ul class="menu">
      <Backdrop bind:state={sidebarState} />
      <Close bind:state={sidebarState} />
      {#if $state.currentProject}
        {#each $chapters
          .filter((chapter) => chapter.project == $state.currentProject)
          .sort((a, b) => a.order - b.order) as chapter, i}
          <Chapter {chapter} on:edit={editChapter}>
            {#each $scenes
              .filter((scene) => scene.chapter == chapter.id)
              .sort((a, b) => a.order - b.order) as scene}
              <Scene {scene} on:edit={editScene} />
            {/each}
            <ButtonGroup small={true}>
              <Button on:click={() => createScene(chapter.id)}>
                <span class="lnr lnr-plus-circle" />
                {$_('sidebar.createScene')}
              </Button>
            </ButtonGroup>
          </Chapter>
        {/each}
      {:else}
        <Placeholder />
      {/if}
    </ul>
    {#if $state.currentProject}
      <div class="actions">
        <div
          use:tippy={{ content: $_('sidebar.editProject'), placement: 'top' }}
          on:click={() => (modals.editProject = true)}>
          <span class="lnr lnr-cog collapse" />
        </div>
        <div
          use:tippy={{ content: $_('sidebar.editOrder'), placement: 'top' }}
          on:click={() => (modals.reArrange = true)}>
          <span class="lnr lnr-line-spacing collapse" />
        </div>
        <div
          use:tippy={{ content: $_('sidebar.createChapter'), placement: 'top' }}
          on:click={() => (modals.createChapter = true)}>
          <span class="lnr lnr-plus-circle collapse" />
        </div>
      </div>
    {/if}
  </div>
{/if}
