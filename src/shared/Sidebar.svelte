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

<style>
  .swap-list {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  .swap-list>li {
    padding: .5rem 0 .5rem 2rem;
  }

  .swap-list>li .action {
    cursor: pointer;
    opacity: .65;
  }

  .swap-list>li .action:hover {
    opacity: 1;
  }

  .swap-list li:first-child .icon-chevron_up {
    visibility: hidden;
  }

  .swap-list li:last-child .icon-chevron_down {
    visibility: hidden;
  }
</style>

{#if showCreateChapter}
	<Modal on:close="{() => showCreateChapter = false}">
		<h2 slot="header">
			New 'chapter'
			<small><em>noun</em> chap·​ter \ ˈchap-tər</small>
		</h2>
    <div class="field">
      <label for="editChapterInput">Title:</label>
      <input id="editChapterInput" bind:value={createChapterTitle} autocomplete="off"
        placeholder="enter your title" type="text">
    </div>
    <hr>
    <div class="btn-group">
      <button on:click={createChapter}>Create!</button>    
    </div>
	</Modal>
{/if}

{#if showCreateScene}
	<Modal on:close="{() => showCreateScene = false}">
		<h2 slot="header">
			New 'scene'
			<small><em>noun</em> \ ˈsēn </small>
		</h2>
    <div class="field">
      <label for="editChapterInput">Title:</label>
      <input id="editChapterInput" bind:value={createSceneTitle} autocomplete="off"
        placeholder="enter your title" type="text">
    </div>
    <hr>
    <div class="btn-group">
      <button on:click={createScene}>Create!</button>
    </div>
	</Modal>
{/if}

{#if showEditChapter}
	<Modal on:close="{() => showEditChapter = false}">
		<h2 slot="header">
		  {objEditChapter.title}<br>
		  <small><em>noun</em> chap·​ter \ ˈchap-tər</small>
		</h2>
    <h3>Edit</h3>
    <div class="field">
      <label for="editChapterInput">Title:</label>
      <input id="editChapterInput" bind:value={objEditChapter.title} autocomplete="off" placeholder="enter your title"
        type="text">
    </div>
    <h3>Order scenes</h3>
    <ul class="swap-list">
      {#each $scenes.filter(scene => scene.chapter == objEditChapter.id).sort((a, b) => a.order - b.order) as scene}
        <li>
          <i class="icon-chevron_up action" on:click={()=> {scenes.orderScene(scene.id, true)}}/>
          <i class="icon-chevron_down action" on:click={()=> {scenes.orderScene(scene.id, false)}}/>
          <span>{scene.title}</span>
        </li>
      {/each}
    </ul>
    <div class="btn-group">
      <button on:click={editChapter}>Save</button>
      <button style="float: right;" class="warning" on:click={
          ()=> {
            chapters.removeChapter(objEditChapter.id);
            showEditChapter = false;
          }
        }
        >Delete</button>
    </div>
	</Modal>
{/if}

{#if showEditScene}
	<Modal on:close="{() => showEditScene = false}">
		<h2 slot="header">
			{objEditScene.title}<br>
			<small><em>noun</em> \ ˈsēn </small>
		</h2>
    <div class="field">
      <label for="editChapterInput">Title:</label>
      <input id="editChapterInput" bind:value={objEditScene.title} autocomplete="off"
        placeholder="enter your title" type="text">
    </div>
    <br>
    <div class="btn-group">
      <button on:click={editScene}>Save</button>
      <button style="float: right;" class="warning" on:click={()=> {
        scenes.removeScene(objEditScene.id);
        showEditScene = false;
        }
        }>Delete</button>
    </div>
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
            <i class="icon-settings action" on:click="{() => [showEditChapter, objEditChapter] = [true, chapter]}" />
          </span>
          <ul>
            {#each $scenes.filter(scene => scene.chapter == chapter.id).sort((a, b) => a.order - b.order) as scene}
              <li
                use:active={'/write/' + scene.id, 'active'}
                on:click={() => push('/write/' + scene.id)}>
                <a href="/write/{scene.id}" use:link>{scene.title}</a>
                <i class="icon-settings action"
                  on:click="{() => [showEditScene, objEditScene] = [true, scene]}" />
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