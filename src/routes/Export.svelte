<script lang="javascript">
  import { Export, ExportRTF } from "../export";
  import { state } from "../stores";
  import { _ } from "svelte-i18n";

  import Placeholder from "../shared/Placeholder.svelte";
  import RTF from "./Export/RTF.svelte";
  import EPUB from "./Export/EPUB.svelte";
</script>

<style type="text/css">
  .export-container {
    max-width: 800px;
    margin: auto;
    text-align: center;
  }
</style>

<div class="export-container">
  {#if !window.hasOwnProperty('cordova')}
    {#if $state.currentProject}
      <RTF />
      <EPUB />
    {:else}
      <Placeholder />
    {/if}
  {:else}
    <i>Coming soon on mobile!</i>
  {/if}
</div>
