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

  function openChapter(chapterId, i) {
    $chapters[i].ui.open = !$chapters[i].ui.open;
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
			modal
			<small><em>adjective</em>  mod·al \ˈmō-dəl\</small>
		</h2>

		<ol class="definition-list">
			<li>of or relating to modality in logic</li>
			<li>containing provisions as to the mode of procedure or the manner of taking effect —used of a contract or legacy</li>
			<li>of or relating to a musical mode</li>
			<li>of or relating to structure as opposed to substance</li>
			<li>of, relating to, or constituting a grammatical form or category characteristically indicating predication</li>
			<li>of or relating to a statistical mode</li>
		</ol>

		<a href="https://www.merriam-webster.com/dictionary/modal">merriam-webster.com</a>
	</Modal>
{/if}