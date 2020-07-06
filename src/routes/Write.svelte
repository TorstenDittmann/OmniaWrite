<script>
  import { onMount, onDestroy } from "svelte";
  import { fade } from "svelte/transition";
  import { scenes, chapters, state, cards, settings } from "../stores";
  import { push, location } from "svelte-spa-router";
  import { _ } from "svelte-i18n";
  import OmniaEditor from "omnia-editor";

  import Overview from "./Write/Overview.svelte";
  import Toast from "../shared/Toast.svelte";
  import Placeholder from "../shared/Placeholder.svelte";

  export let params = {};
  let currentScene;
  let editor;
  let amountWords = 0;
  let amountChars = 0;

  let showToast = false;
  let showToastText;

  let focusMode = false;

  $: currentScene = $scenes.filter((scene) => scene.id == params.sceneId)[0];
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
    }
  };

  const change = (e) => {
    scenes.setSceneContent(params.sceneId, e.detail);
    showToast = true;
    showToastText = $_("write.toast.saved");
  };

  const init = () => {
    countWordsAndChars();
  };

  function shortcutListener(evt) {
    evt = evt || window.event;

    // Escape => Toggle focus mode
    if (evt.keyCode == 27) {
      evt.preventDefault();
      toggleFocus();
    }
    // CTRL/CMD + S => Save
    if (
      (window.navigator.platform.match("Mac") ? evt.metaKey : evt.ctrlKey) &&
      evt.keyCode == 83
    ) {
      evt.preventDefault();
      save(params.sceneId);
    }
  }

  function countWordsAndChars() {
    // TODO implement counter into omnia-editor
    /*amountChars = editorElement.innerText.length;
    if (amountChars > 0) {
      amountWords = editorElement.innerText.split(" ").length;
    } else {
      amountWords = 0;
    }*/
  }

  function switchScene(e) {
    push("/write/" + e.target.value);
    e.target.selectedIndex = 0;
  }

  function toggleFocus() {
    focusMode = !focusMode;
    document.getElementById("content").classList.toggle("focus");
    document.getElementById("titlebar").classList.toggle("focus-mode");
  }

  function undo() {
    document.execCommand("undo", false, null);
  }

  function redo() {
    document.execCommand("redo", false, null);
  }
</script>

<style>
  * {
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0) !important;
    -webkit-focus-ring-color: rgba(255, 255, 255, 0) !important;
    outline: 0 !important;
  }
</style>

<Toast bind:show={showToast} text={showToastText} />
<div in:fade={{ duration: 100 }}>
  {#if $state.currentProject}
    {#if params.sceneId !== null}
      <div class="toolbar">
        <span class="tooltip">
          {amountWords} {$_('write.toolbar.words')}
          <span class="tooltiptext">
            {amountChars} {$_('write.toolbar.chars')}
          </span>
        </span>
        <span class="lnr lnr-undo tooltip" on:click={undo}>
          <span class="tooltiptext">{$_('write.toolbar.undo')}</span>
        </span>
        <span class="lnr lnr-redo tooltip" on:click={redo}>
          <span class="tooltiptext">{$_('write.toolbar.redo')}</span>
        </span>
        <span
          class="lnr tooltip"
          on:click={toggleFocus}
          class:lnr-eye={!focusMode}
          class:lnr-exit={focusMode}>
          <span class="tooltiptext">{$_('write.toolbar.focus')}</span>
        </span>
        {#if focusMode}
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
        <h1 contenteditable="true">{currentScene.title}</h1>
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
