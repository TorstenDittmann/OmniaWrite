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

  function toggleFullscreen() {
    let element = document.documentElement;
    if (!document.fullscreen) {
      element.webkitRequestFullscreen();
    } else {
      document.webkitExitFullscreen();
    }
  }

  function notifyMe() {
    var text = 'HEY! Your task is now overdue.';

    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }

    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
      // If it's okay let's create a notification
      var notification = new Notification('OmniaWrite', {
        body: text
      });
    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          var notification = new Notification('OmniaWrite', {
            body: text
          });
        }
      });
    }

    // At last, if the user has denied notifications, and you
    // want to be respectful there is no need to bother them any more.
  }
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
    font-family: 'Fira Mono', monospace;
    text-align: center;
  }

  .nodeText {
    font-family: 'Fira Mono', monospace;
    padding: 5%;
    color: #acbac3;
    font-weight: 400;
    font-size: 0.9rem;
    line-height: 2rem;
    text-align: justify;
  }

  .toolbar {
    position: sticky;
    position: -webkit-sticky;
    top: 0;
    text-align: center;
    background-color: #1b2a32;
    padding: 1rem;
    font-size: 1.5rem;
    cursor: pointer;
  }

  .redo:before {
    display: inline-block;
    transform: scaleX(-1);
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
<div class="toolbar">
  <i class="icon-reply tooltip">
    <span class="tooltiptext">Undo</span>
  </i>
  <i class="icon-reply redo tooltip">
    <span class="tooltiptext">Redo</span>
  </i>
  <i class="icon-eye tooltip" on:click={notifyMe}>
    <span class="tooltiptext">Focus</span>
  </i>
  <i class="icon-more_node_links tooltip" on:click={toggleFullscreen}>
    <span class="tooltiptext">Fullscreen</span>
  </i>
</div>
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