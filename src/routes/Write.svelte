<script lang="javascript">
  import { onMount, onDestroy } from "svelte";
  import { scenes, chapters, state, cards } from "../stores";
  import { push, location } from "svelte-spa-router";
  import { _ } from "svelte-i18n";
  import Paragraph from "./Write/paragraph";

  import Overview from "./Write/Overview.svelte";
  import EditorJS from "@editorjs/editorjs";
  import Header from "@editorjs/header";
  import Quote from "@editorjs/quote";
  import Toast from "../shared/Toast.svelte";
  import Placeholder from "../shared/Placeholder.svelte";

  export let params = {};
  let currentScene;
  let currentChapter;
  let lastScene;
  let editorHtml;
  let editor;
  let editorChangeHappened;
  let amountWords = 0;
  let amountChars = 0;

  let showToast = false;
  let showToastText;

  let focusMode = false;

  $: currentScene = $scenes.filter(scene => scene.id == params.sceneId)[0];
  $: state.setCurrentTitle(
    params.sceneId ? currentScene.title : "No scene selected!"
  );
  $: {
    if ($location) {
      init();
    }
  }

  onMount(() => {
    if (params.sceneId !== null) {
      document.addEventListener("keydown", shortcutListener, false);
    }
  });

  onDestroy(() => {
    document.removeEventListener("keydown", shortcutListener);
    if (editorChangeHappened) {
      save(lastScene);
    }
    if (editor && typeof editor.destroy === "function") {
      editor.destroy();
    }
  });

  function init() {
    if (params.sceneId !== null) {
      if (editor && typeof editor.destroy === "function") {
        if (editorChangeHappened) {
          save(lastScene);
        }
        editor.destroy();
      }
      editorChangeHappened = false;
      editor = new EditorJS({
        holder: "codex-editor",
        placeholder: $_("write.editor.placeholder"),
        data: currentScene.content,
        onChange: () => {
          editorChangeHappened = true;
          countWordsAndChars();
        },
        onReady: () => {
          countWordsAndChars();
        },
        tools: {
          paragraph: {
            class: Paragraph,
            inlineToolbar: false,
            config: {
              project: $state.currentProject,
              cards: $cards.filter(
                card =>
                  card.project == $state.currentProject &&
                  card.showTooltip == true
              )
            }
          }
        },
        logLevel: "ERROR"
      });
      editor.tools;
      lastScene = params.sceneId;
    }
  }

  function save(param) {
    editor
      .save()
      .then(outputData => {
        scenes.setSceneContent(param, outputData);
        editorChangeHappened = false;
        showToast = true;
        showToastText = $_("write.toast.saved");
      })
      .catch(error => {
        console.error("Saving failed: ", error);
      });
  }

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
    amountChars = document.getElementById("codex-editor").innerText.length;
    amountWords = document.getElementById("codex-editor").innerText.split(" ")
      .length;
  }

  function switchScene(e) {
    push("/write/" + e.target.value);
    e.target.selectedIndex = 0;
  }

  function toggleFullscreen() {
    let element = document.documentElement;
    if (!document.fullscreen) {
      element.webkitRequestFullscreen();
    } else {
      document.webkitExitFullscreen();
    }
  }

  function toggleFocus() {
    focusMode = !focusMode;
    document.getElementById("content").classList.toggle("focus");
  }

  function undo() {
    document.execCommand("undo", false, null);
  }

  function redo() {
    document.execCommand("redo", false, null);
  }
</script>

<style type="text/css">
  * {
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0) !important;
    -webkit-focus-ring-color: rgba(255, 255, 255, 0) !important;
    outline: 0 !important;
  }
</style>

<Toast bind:show={showToast} text={showToastText} />

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
      {#if editorChangeHappened}
        <span
          class="lnr lnr-checkmark-circle tooltip"
          on:click={() => save(params.sceneId)}>
          <span class="tooltiptext">{$_('write.toolbar.save')}</span>
        </span>
      {/if}
      <span
        class="lnr tooltip"
        on:click={toggleFocus}
        class:lnr-eye={!focusMode}
        class:lnr-exit={focusMode}>
        <span class="tooltiptext">{$_('write.toolbar.focus')}</span>
      </span>
      <!--<span class="lnr lnr-frame-expand tooltip" on:click={toggleFullscreen}>
        <span class="tooltiptext">{$_('write.toolbar.fullscreen')}</span>
      </span>-->
      {#if focusMode}
        <select id="focusSceneSelect" on:change={switchScene}>
          <option value="" selected="selected">
            {$_('write.toolbar.switchScene')}
          </option>
          {#each $chapters.filter(chapter => chapter.project == $state.currentProject) as chapter, i}
            <optgroup label={chapter.title}>
              {#each $scenes.filter(scene => scene.chapter == chapter.id) as scene}
                <option value={scene.id}>{scene.title}</option>
              {/each}
            </optgroup>
          {/each}
        </select>
      {/if}
    </div>
    <div class="editpane">
      <h1 contenteditable="true">{currentScene.title}</h1>
      <div id="codex-editor" />
    </div>
  {:else}
    <Overview />
  {/if}
{:else}
  <Placeholder />
{/if}
