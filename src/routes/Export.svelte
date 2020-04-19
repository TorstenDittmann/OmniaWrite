<script lang="javascript">
  import { fade } from "svelte/transition";
  import { Export, ExportRTF } from "../export";
  import { state } from "../stores";
  import { _ } from "svelte-i18n";

  import Placeholder from "../shared/Placeholder.svelte";
  import RTF from "./Export/RTF.svelte";
  import EPUB from "./Export/EPUB.svelte";
  import Cloud from "./Export/Cloud.svelte";
</script>

<style type="text/css">
  .export-container {
    max-width: 800px;
    margin: auto;
    text-align: center;
  }
</style>

<div class="export-container" in:fade={{ duration: 100 }}>
  {#if !window.hasOwnProperty('cordova')}
    {#if $state.currentProject}
      <RTF />
      <EPUB />
      <Cloud />
    {:else}
      <Placeholder />
    {/if}
  {:else}
    <i>Coming soon on mobile!</i>
  {/if}
</div>
