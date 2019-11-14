<script>
  import {
    onMount
  } from "svelte";
  import {
    scenes,
    chapters,
    state
  } from "../stores";
  import {
    push,
    location
  } from 'svelte-spa-router';

  import WriteOverview from './Write/WriteOverview.svelte';
  import EditorJS from '@editorjs/editorjs';


  export let params = {};
  let currentScene;
  let currentChapter;
  let editorHtml;
  let editor;

  $: currentScene = $scenes.filter(scene => scene.id == params.sceneId)[0];
  $: state.setCurrentTitle(params.sceneId ? currentScene.title : 'No scene selected!');
  $: {
    if ($location) {
      init();
    }
  }

  onMount(() => {
    if (params.sceneId !== null) {
      document.onkeydown = function (evt) {
        evt = evt || window.event;
        if (evt.keyCode == 27) {
          toggleFocus();
        }
      };
    }
  });

  function init() {
    if (editor && typeof editor.destroy === 'function') {
      editor.destroy();
    }

    editor = new EditorJS({
      holder: 'codex-editor',
      placeholder: 'Let`s write an awesome story!',
      data: currentScene.content
    });
  }

  function save() {
    editor.save().then((outputData) => {
      scenes.setSceneContent(params.sceneId, outputData)
    }).catch((error) => {
      console.log('Saving failed: ', error)
    });
  }

  function switchScene(e) {
    push('/write/' + e.target.value);
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
    document.getElementById("content").classList.toggle("focus");
    document.getElementById("focusSceneSelect").classList.toggle("active");
  }

  function undo() {
    document.execCommand('undo', false, null);
  }

  function redo() {
    document.execCommand('redo', false, null);
  }
</script>

<style>
  * {
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0) !important;
    -webkit-focus-ring-color: rgba(255, 255, 255, 0) !important;
    outline: 0 !important;
  }
</style>
{#if params.sceneId !== null}
<div class="toolbar">
  <span class="tooltip">
    0 words
    <span class="tooltiptext">0 characters</span>
  </span>
  <i class="icon-reply tooltip" on:click={undo}>
    <span class="tooltiptext">Undo</span>
  </i>
  <i class="icon-reply redo tooltip" on:click={redo}>
    <span class="tooltiptext">Redo</span>
  </i>
  <i class="icon-check_circle tooltip" on:click={save}>
    <span class="tooltiptext">Save</span>
  </i>
  <i class="icon-eye tooltip" on:click={toggleFocus}>
    <span class="tooltiptext">Focus</span>
  </i>
  <i class="icon-more_node_links tooltip" on:click={toggleFullscreen}>
    <span class="tooltiptext">Fullscreen</span>
  </i>
  <select id="focusSceneSelect" on:change={switchScene}>
    <option value="" selected="selected">Switch scene...</option>
    {#each $chapters.filter(chapter => chapter.project == $state.currentProject) as chapter, i}
      <optgroup label={chapter.title}>
        {#each $scenes.filter(scene => scene.chapter == chapter.id) as scene}
          <option value={scene.id}>{scene.title}</option>
        {/each}
      </optgroup>
    {/each}
  </select>
</div>
<div class="editpane">
    <h1 contenteditable="true">{currentScene.title}</h1>
<div id="codex-editor">
</div>
</div>
{:else}
<WriteOverview></WriteOverview>
{/if}