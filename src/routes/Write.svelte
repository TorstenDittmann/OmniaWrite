<script>
import { scenes } from "../stores";
export let params = {};
let currentScene;

$: currentScene = $scenes.filter(scene => scene.id == params.sceneId);
</script>

{#if params.sceneId == null}
  No Scene selected
{:else}
{currentScene[0].content}
{/if}
