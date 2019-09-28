<script>
  import { state, chapters, scenes } from "../stores";
  import { link, push } from "svelte-spa-router";
  import active from "svelte-spa-router/active";
  import { setDeep } from 'svelte-extras';


  export let sidebarState;

  function openChapter(chapterId,i) {
    console.log($chapters);
  }
</script>

<div id="sidebar" class="navigation" class:active={sidebarState}>
  <ul class="menu">
    <div class="backdrop" on:click={() => (sidebarState = false)} />
    <a
      id="close-sidebar"
      href="#"
      class="close"
      on:click={() => (sidebarState = false)}>
      <i class="icon icon-close" />
    </a>
    {#each $chapters as chapter, i}
      <li class="parent" class:open={chapter.ui.open}>
        <span class="key" on:click={() => openChapter(chapter.id, i)}>
          {chapter.title}
          <i class="icon icon-caret collapse" />
        </span>
        <ul>
          {#each $scenes.filter(scene => scene.chapter == chapter.id) as scene}
            <li
              use:active={"/write/" + scene.id, "active"}
              on:click={() => push("/write/" + scene.id)}>
              <a href="/write/{scene.id}" use:link>{scene.title}</a>
            </li>
          {/each}
        </ul>
      </li>
    {/each}
  </ul>
</div>
