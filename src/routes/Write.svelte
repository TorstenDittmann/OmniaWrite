<script>
	import { onMount } from 'svelte';
  import { scenes } from "../stores";
  export let params = {};
  let currentScene;

  $: currentScene = $scenes.filter(scene => scene.id == params.sceneId)[0];

  onMount(() => {
    if(params.sceneId !== null) {
    document.getElementById("editor").addEventListener("input", function() {
      $scenes = $scenes.map(scene => 
        scene.id == params.sceneId
          ? { ...scene, content: currentScene.content }
          : scene
      );
    }, false);
    }
	});
</script>

{#if params.sceneId == null}
  No Scene selected
{:else}
  <div 
  id="editor"
  contenteditable="true"
  bind:innerHTML={currentScene.content}>
  </div>
{/if}
