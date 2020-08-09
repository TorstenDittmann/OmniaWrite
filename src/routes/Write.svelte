<script>
  import { onMount, onDestroy } from "svelte";
  import { fade } from "svelte/transition";
  import { scenes, chapters, state, cards, settings, ui } from "../stores";
  import { push, location } from "svelte-spa-router";
  import { _ } from "svelte-i18n";

  import OmniaEditor from "omnia-editor";
  import tippy from "sveltejs-tippy";

  import { countChars, countWords } from "../utils";

  import Overview from "./Write/Overview.svelte";
  import Toast from "../shared/Toast.svelte";
  import Placeholder from "../shared/Placeholder.svelte";

  export let params = {};
  let currentScene;
  let editor;

  $: currentScene = $scenes.filter((scene) => scene.id == params.sceneId)[0];
  $: analytics =
    params.sceneId && currentScene.content
      ? currentScene.content.blocks.reduce(
          (prev, curr) =>
            curr.data && curr.data.text
              ? {
                  chars: prev.chars + countChars(curr.data.text),
                  words: prev.words + countWords(curr.data.text),
                }
              : prev,
          {
            chars: 0,
            words: 0,
          }
        )
      : {};
  $: {
    state.setCurrentTitle(
      params.sceneId ? currentScene.title : "No scene selected!"
    );
  }

  onMount(() => {
    tippy("[data-tooltip]");
    window.addEventListener("hashchange", routeChange, false);
    if (params.sceneId !== null) {
      document.addEventListener("keydown", shortcutListener, false);
    }
  });

  onDestroy(() => {
    document.removeEventListener("keydown", shortcutListener);
    window.removeEventListener("hashchange", routeChange, false);
  });

  const routeChange = () => {
    if (editor) {
      editor.update();
      document.getElementById("content").scrollTo(0, 0);
    }
  };

  const change = (e) => {
    scenes.setSceneContent(params.sceneId, e.detail);
  };

  const shortcutListener = (evt) => {
    evt = evt || window.event;

    // Escape => Toggle focus mode
    if (evt.keyCode == 27) {
      evt.preventDefault();
      toggleFocus();
    }
  };

  const switchScene = (e) => {
    push("/write/" + e.target.value);
    e.target.selectedIndex = 0;
  };

  const toggleFocus = () => {
    $ui.focus = !$ui.focus;
  };

  const undo = () => {
    document.execCommand("undo", false, null);
  };

  const redo = () => {
    document.execCommand("redo", false, null);
  };
</script>

<style>
  * {
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0) !important;
    -webkit-focus-ring-color: rgba(255, 255, 255, 0) !important;
    outline: 0 !important;
  }
</style>

<div in:fade={{ duration: 100 }}>
  {#if $state.currentProject}
    {#if params.sceneId !== null}
      <div class="toolbar">
        <span
          use:tippy={{ content: `${analytics.chars} ${$_('write.toolbar.chars')}`, placement: 'bottom' }}>
          {analytics.words} {$_('write.toolbar.words')}
        </span>
        <span
          class="lnr lnr-undo"
          use:tippy={{ content: $_('write.toolbar.undo'), placement: 'bottom' }}
          on:click={undo} />
        <span
          class="lnr lnr-redo"
          use:tippy={{ content: $_('write.toolbar.redo'), placement: 'bottom' }}
          on:click={redo} />
        <span
          class="lnr"
          use:tippy={{ content: $_('write.toolbar.focus'), placement: 'bottom' }}
          on:click={toggleFocus}
          class:lnr-eye={!$ui.focus}
          class:lnr-exit={$ui.focus} />
        {#if $ui.focus}
          <!-- svelte-ignore a11y-no-onchange -->
          <select id="focusSceneSelect" on:change={switchScene}>
            <option value="" selected="selected">
              {$_('write.toolbar.switchScene')}
            </option>
            {#each $chapters.filter((chapter) => chapter.project == $state.currentProject) as chapter, i}
              <optgroup label={chapter.title}>
                {#each $scenes.filter((scene) => scene.chapter == chapter.id) as scene}
                  <option value={scene.id}>{scene.title}</option>
                {/each}
              </optgroup>
            {/each}
          </select>
        {/if}
      </div>
      <div class="editpane">
        <h1 contenteditable bind:textContent={currentScene.title} />
        <OmniaEditor
          bind:this={editor}
          data={currentScene.content}
          on:change={change} />
      </div>
    {:else}
      <Overview />
    {/if}
  {:else}
    <Placeholder />
  {/if}
</div>
