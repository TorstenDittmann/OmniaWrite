<script>
  import {
    state,
    chapters,
    scenes
  } from "../stores";

  import {
    link,
    push
  } from "svelte-spa-router";

  import {
    fade,
    fly
  } from 'svelte/transition';

  import Modal from './Modal.svelte';


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
    chapters.createChapter(createSceneChapter, createSceneTitle);
    showCreateScene = false;
    createSceneTitle = "";
  }

  function editChapter(event) {
    window.alert("editChapter");
    event.stopPropagation();
  }

  function editScene(event) {
    window.alert("editScene");
    event.stopPropagation();
  }
</script>

{#if showCreateChapter}
	<Modal on:close="{() => showCreateChapter = false}">
		<h2 slot="header">
			New 'chapter'
			<small><em>noun</em> chap·​ter \ ˈchap-tər</small>
		</h2>
    <input bind:value={createChapterTitle} placeholder="enter your title">
    <button on:click={createChapter}>Create!</button>
	</Modal>
{/if}

{#if showCreateScene}
	<Modal on:close="{() => showCreateScene = false}">
		<h2 slot="header">
			New 'scene'
			<small><em>noun</em> \ ˈsēn </small>
		</h2>
    <input bind:value={createSceneTitle} placeholder="enter your title">
    <button on:click={createScene}>Create!</button>
	</Modal>
{/if}

{#if sidebarState}
<div id="sidebar" class="navigation" class:active={sidebarState} in:fly="{{ y: 200, duration: 200 }}" out:fly="{{ y: 200, duration: 200 }}">
  <ul class="menu">
    <div class="backdrop" on:click={()=> (sidebarState = false)} />
      <div id="close-sidebar" class="close" on:click={()=> (sidebarState = false)}>
        <i class="icon-cross_mark" />
      </div>
      {#each $chapters.filter(chapter => chapter.project == $state.currentProject) as chapter, i}
        <li class="parent" class:open={chapter.ui.open}>
          <span class="key" on:click={()=> chapters.toggleChapterInSidebar(chapter.id)}>
            {chapter.title}
            <i class="icon-chevron_down collapse" />
            <i class="icon-settings action" on:click="{editChapter}" />
          </span>
          <ul>
            {#each $scenes.filter(scene => scene.chapter == chapter.id) as scene}
              <li
                use:active={'/write/' + scene.id, 'active'}
                on:click={() => push('/write/' + scene.id)}>
                <a href="/write/{scene.id}" use:link>{scene.title}</a>
                <i class="icon-settings action" on:click="{editScene}" />
              </li>
            {/each}
            <li>
              <div class="btn-group">
                <button on:click={()=> openCreateScene(chapter.id)}>
                  <i class="icon-plus" /> New
                </button>
              </div>
            </li>
          </ul>
        </li>
      {/each}
      <hr class="divider">
      <li class="parent">
        <span class="key" on:click="{() => showCreateChapter = true}">
          <i class="icon-plus collapse" />
          Create Chapter
        </span>
      </li>
  </ul>
</div>
{/if}