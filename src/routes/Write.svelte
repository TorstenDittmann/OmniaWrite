<script>
  import { onMount, onDestroy } from "svelte";
  import { fade } from "svelte/transition";
  import { scenes, chapters, state, cards, settings } from "../stores";
  import { push, location } from "svelte-spa-router";
  import { _ } from "svelte-i18n";
  import Paragraph, { QuoteTool } from "./Write/paragraph";

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
  let editor;
  let editorChangeHappened;
  let editorElement;
  let amountWords = 0;
  let amountChars = 0;

  let showToast = false;
  let showToastText;

  let focusMode = false;
  let autosave;

  $: currentScene = $scenes.filter((scene) => scene.id == params.sceneId)[0];
  $: state.setCurrentTitle(
    params.sceneId ? currentScene.title : "No scene selected!"
  );
  $: {
    if ($location) {
      init();
    }
  }

  onMount(() => {
    clearTimeout(autosave);
    if (params.sceneId !== null) {
      document.addEventListener("keydown", shortcutListener, false);
    }
  });

  onDestroy(() => {
    clearTimeout(autosave);
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
          clearTimeout(autosave);
          editorChangeHappened = true;
          countWordsAndChars();
          if ($settings.autosave) {
            autosave = setTimeout(() => {
              save(params.sceneId);
            }, 10000);
          }
        },
        onReady: () => {
          countWordsAndChars();
        },
        tools: {
          quote: {
            class: QuoteTool,
          },
          paragraph: {
            class: Paragraph,
            inlineToolbar: ["bold", "italic", "quote"],
            config: {
              project: $state.currentProject,
              cards: $cards.filter((card) => {
                return (
                  card.project == $state.currentProject &&
                  card.showTooltip == true
                );
              }),
            },
          },
        },
        logLevel: "ERROR",
      });
      editor.tools;
      lastScene = params.sceneId;
    }
  }

  function save(param) {
    editor
      .save()
      .then((outputData) => {
        clearTimeout(autosave);
        scenes.setSceneContent(param, outputData);
        editorChangeHappened = false;
        showToast = true;
        showToastText = $_("write.toast.saved");
      })
      .catch((error) => {
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
    if (editorElement) {
      amountChars = editorElement.innerText.length;
      if (amountChars > 0) {
        amountWords = editorElement.innerText.split(" ").length;
      } else {
        amountWords = 0;
      }
    }
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

<style type="text/css">
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
        <div id="codex-editor" bind:this={editorElement} />
      </div>
    {:else}
      <Overview />
    {/if}
  {:else}
    <Placeholder />
  {/if}
</div>
