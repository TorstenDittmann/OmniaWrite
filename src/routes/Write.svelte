<script>
  import { scenes } from "../stores";
  export let params = {};
  let currentScene;

  $: currentScene = $scenes.filter(scene => scene.id == params.sceneId);

  function saveScene() {
    $scenes = $scenes.map(scene =>
      scene.id == params.sceneId
        ? { ...scene, content: currentScene[0].content }
        : scene
    );
  }
</script>

{#if params.sceneId == null}
  No Scene selected
{:else}
  <h1 on:click={saveScene}>Test save</h1>
  <div 
  contenteditable="true"
  bind:innerHTML={currentScene[0].content}>
  </div>
{/if}
