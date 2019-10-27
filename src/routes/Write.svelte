<script>
  import {
    onMount
  } from "svelte";
  import {
    scenes,
    chapters,
    state
  } from "../stores";
  export let params = {};
  let currentScene;
  let currentChapter;
  let editorHtml;

  $: currentScene = $scenes.filter(scene => scene.id == params.sceneId)[0];
  $: state.setCurrentTitle(params.sceneId ? currentScene.title : 'No scene selected!');

  onMount(() => {
    if (params.sceneId !== null) {
      editorHtml = document.getElementById("editor");
      editorHtml.addEventListener(
        "input",
        async () => {
            scenes.setSceneContent(params.sceneId, currentScene.content);
          },
          false
      );
      editorHtml.addEventListener("paste", function (e) {
        e.preventDefault();
        let text = (e.originalEvent || e).clipboardData.getData("text/plain");
        document.execCommand("insertHTML", false, text);
      });
    }
  });
</script>

<style>
  * {
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0) !important;
    -webkit-focus-ring-color: rgba(255, 255, 255, 0) !important;
    outline: 0 !important;
  }

  .editpane {
    margin: 0 auto;
    max-width: 800px;
  }

  .editpane>h1 {
    font-family: 'Roboto Mono', monospace;
    text-align: center;
  }

  .nodeText {
    font-family: 'Roboto Mono', monospace;
    padding: 5%;
    color: #acbac3;
    font-weight: 400;
    font-size: 0.9rem;
    line-height: 2rem;
    text-align: justify;
  }

  @media (min-width: 1200px) {
    .editpane {
      padding: 10px;
      box-shadow: 0 5px 26px 2px rgba(0, 0, 0, 0.2);
    }

    .nodeText {
      line-height: 2.5rem;
    }
  }

  @media (max-width: 960px) {
    .nodeText {
      padding: 0 0 100%;
    }
  }
</style>

<div class="editpane">
  {#if params.sceneId == null}
    No Scene selected
  {:else}
    <h1 contenteditable="true">{currentScene.title}</h1>
    <div
      id="editor"
      class="nodeText"
      contenteditable="true"
      bind:innerHTML={currentScene.content} />
  {/if}
</div>