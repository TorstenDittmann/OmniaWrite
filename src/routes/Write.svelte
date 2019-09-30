<script>
	import { onMount } from 'svelte';
  import { scenes } from "../stores";
  export let params = {};
  let currentScene;
  let editorHtml;

  $: currentScene = $scenes.filter(scene => scene.id == params.sceneId)[0];

  onMount(() => {
    if(params.sceneId !== null) {
    editorHtml = document.getElementById("editor");
    editorHtml.addEventListener("input", async function() {
      $scenes = $scenes.map(scene => 
        scene.id == params.sceneId
          ? { ...scene, content: currentScene.content }
          : scene
      );
    }, false);
    editorHtml.addEventListener("paste", function(e) {
      e.preventDefault();
      let text = (e.originalEvent || e).clipboardData.getData('text/plain');
      document.execCommand("insertHTML", false, text);
    });
    }
	});
</script>

<style>
* {
  -webkit-tap-highlight-color: rgba(255,255,255,0)!important;
  -webkit-focus-ring-color: rgba(255,255,255,0)!important;
  outline: 0!important;
}
.editpane {
  margin: 0 auto;
  max-width: 800px;
}

.nodeText {
  font-family: "Source Code Pro",monospace;
  padding: 0 0 100%;
  color: #acbac3;
  font-weight: 400;
  line-height: 2.5rem;
}
@media (min-width: 1200px) {
  .editpane {
    padding: 10px;
    box-shadow: 0 5px 26px 2px rgba(0,0,0,.2);
  }
  .nodeText {
    padding: 5%;
    line-height: 2.5rem;
  }
}
</style>
<div class="editpane">
{#if params.sceneId == null}
  No Scene selected
{:else}
  <div 
  id="editor"
  class="nodeText"
  contenteditable="true"
  bind:innerHTML={currentScene.content}>
  </div>
{/if}
</div>
