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
      : {
          chars: 0,
          words: 0,
        };
  $: {
    state.setCurrentTitle(
      params.sceneId ? currentScene.title : "No scene selected!"
    );
  }

  onMount(() => {
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
      document.querySelector(".content").scrollTo(0, 0);
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
    scenes.setSceneContent(params.sceneId, editor.getContent());
  };

  const redo = () => {
    document.execCommand("redo", false, null);
    scenes.setSceneContent(params.sceneId, editor.getContent());
  };
</script>

<style lang="scss">
  * {
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0) !important;
    -webkit-focus-ring-color: rgba(255, 255, 255, 0) !important;
    outline: 0 !important;
  }

  .editpane {
    margin: 0 auto;
    max-width: 800px;

    @media (min-width: 1200px) {
      padding: 10px;
      box-shadow: 0 5px 26px 2px rgba(0, 0, 0, 0.2);
    }

    > h1 {
      font-family: "IBM Plex Mono", monospace;
      text-align: center;
    }
  }

  select#focusSceneSelect {
    background-color: var(--select-background);
    width: auto;
    font-size: 1rem;
    font-weight: bold;
    color: var(--text-color);
    text-align: center;
    -webkit-appearance: none;
    border: 0;
    cursor: pointer;

    &:focus,
    &:active {
      border: 0;
      outline: 0;
    }
  }

  .toolbar {
    position: sticky;
    position: -webkit-sticky;
    top: 0;
    text-align: center;
    background-color: var(--background-color);
    padding: 1rem;
    font-size: 1.5rem;
    cursor: pointer;
    margin-bottom: 2rem;
    z-index: 8;

    > * {
      margin: 0 0.5rem;
      opacity: 0.65;
    }
    > *:hover {
      opacity: 1;
    }
    > span {
      font-size: 1rem;
    }
    > .lnr {
      font-size: unset;
    }
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
