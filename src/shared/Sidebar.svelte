<script>
  import { state, chapters, scenes } from "../stores";
  import { onMount } from "svelte";
  import { link, push, replace } from "svelte-spa-router";
  import { fade, fly } from "svelte/transition";
  import { _ } from "svelte-i18n";

  import Modal from "./Modal.svelte";
  import Placeholder from "./Placeholder.svelte";
  import active from "svelte-spa-router/active";
  import { initDraggable } from "./Sidebar/draggable";

  import CreateChapter from "./Sidebar/CreateChapter.svelte";
  import CreateScene from "./Sidebar/CreateScene.svelte";
  import EditChapter from "./Sidebar/EditChapter.svelte";
  import EditScene from "./Sidebar/EditScene.svelte";
  import ReArrange from "./Sidebar/ReArrange.svelte";

  export let sidebarState;

  let reArrange = {
    show: false,
  };

  let createChapter = {
    show: false,
  };

  let createScene = {
    show: false,
    chapter: "",
  };

  let editChapter = {
    show: false,
    data: {},
  };

  let editScene = {
    show: false,
    data: {},
  };

  onMount(() => {
    initDraggable(document.querySelectorAll(".menu .parent"));
    initDraggable(document.querySelectorAll(".scenes .sceneDrag"));
  });

  function startDrag(e) {
    e.target.parentNode.parentNode.setAttribute("draggable", true);
  }
  function startDragScene(e) {
    e.target.parentNode.setAttribute("draggable", true);
  }
</script>

{#if reArrange.show}
  <ReArrange {...reArrange} />
{/if}

<CreateChapter {...createChapter} />
<CreateScene {...createScene} />
<EditChapter {...editChapter} />
<EditScene {...editScene} />

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
        style="-webkit-app-region: no-drag" />
      <div
        id="close-sidebar"
        class="close"
        on:click={() => (sidebarState = false)}
        style="-webkit-app-region: no-drag">
        <span class="lnr lnr-cross" />
      </div>
      {#if $state.currentProject}
        {#each $chapters
          .filter((chapter) => chapter.project == $state.currentProject)
          .sort((a, b) => a.order - b.order) as chapter, i}
          <li class="parent" class:open={chapter.ui.open}>
            <span
              class="key"
              on:click|self={() => chapters.toggleChapterInSidebar(chapter.id)}>
              {chapter.title}
              <span
                class="lnr lnr-chevron-up collapse"
                on:click|self={() => chapters.toggleChapterInSidebar(chapter.id)} />
              <span
                class="lnr lnr-cog action"
                on:click={() => ([editChapter.show, editChapter.data] = [true, chapter])} />
            </span>
            <ul class="scenes">
              {#each $scenes
                .filter((scene) => scene.chapter == chapter.id)
                .sort((a, b) => a.order - b.order) as scene}
                <li
                  use:active={'/write/' + scene.id}
                  on:click|self={() => push('/write/' + scene.id)}>
                  <a href="/write/{scene.id}" use:link>{scene.title}</a>
                  <span
                    class="lnr lnr-cog action"
                    on:click={() => ([editScene.show, editScene.data] = [true, scene])} />
                </li>
              {/each}
              <li>
                <button
                  on:click={() => ([createScene.show, createScene.chapter] = [true, chapter.id])}>
                  <span class="lnr lnr-plus-circle" />
                  {$_('sidebar.createScene')}
                </button>
              </li>
            </ul>
          </li>
        {/each}
        <hr class="divider" />
        <li class="parent open">
          <span class="key" on:click={() => (createChapter.show = true)}>
            <span class="lnr lnr-plus-circle collapse" />
            {$_('sidebar.createChapter')}
          </span>
        </li>
        <li class="parent open">
          <span class="key" on:click={() => (reArrange.show = true)}>
            <span class="lnr lnr-line-spacing collapse" />
            {$_('sidebar.reArrange')}
          </span>
        </li>
      {:else}
        <Placeholder />
      {/if}
    </ul>
  </div>
{/if}
