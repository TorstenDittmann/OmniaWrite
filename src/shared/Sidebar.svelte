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

  function openChapter(chapterId, i) {
    $chapters[i].ui.open = !$chapters[i].ui.open;
  }

  let showCreateChapter = false;
  let createChapterTitle;

  function createChapter() {
    chapters.set($chapters.concat([{
      id: (Math.floor(Math.random() * 999) + 100),
      project: $state.currentProject,
      title: createChapterTitle,
      order: 3,
      ui: {
        open: true
      }
    }]));
    showCreateChapter = false;
  }
</script>

{#if sidebarState}
<div id="sidebar" class="navigation" class:active={sidebarState} in:fly="{{ y: 200, duration: 200 }}" out:fly="{{ y: 200, duration: 200 }}">
  <ul class="menu">
    <div class="backdrop" on:click={()=> (sidebarState = false)} />
      <div id="close-sidebar" class="close" on:click={()=> (sidebarState = false)}>
        <i class="icon icon-close" />
      </div>
      {#each $chapters.filter(chapter => chapter.project == $state.currentProject) as chapter, i}
        <li class="parent" class:open={chapter.ui.open}>
          <span class="key" on:click={() => openChapter(chapter.id, i)}>
            {chapter.title}
            <i class="icon icon-caret collapse" />
          </span>
          <ul>
            {#each $scenes.filter(scene => scene.chapter == chapter.id) as scene}
              <li
                use:active={'/write/' + scene.id, 'active'}
                on:click={() => push('/write/' + scene.id)}>
                <a href="/write/{scene.id}" use:link>{scene.title}</a>
              </li>
            {/each}
          </ul>
        </li>
      {/each}
      <hr class="divider">
      <li class="parent">
        <span class="key" on:click="{() => showCreateChapter = true}">
          <i class="icon icon-plus collapse" />
          Create Chapter
        </span>
      </li>
  </ul>
</div>
{/if}

{#if showCreateChapter}
	<Modal on:close="{() => showCreateChapter = false}">
		<h2 slot="header">
			chapter
			<small><em>noun</em> chap·​ter \ ˈchap-tər</small>
		</h2>
    <input bind:value={createChapterTitle} placeholder="enter your title">
    <button on:click={createChapter}>Create!</button>
	</Modal>
{/if}