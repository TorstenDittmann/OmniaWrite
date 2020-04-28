<script lang="javascript">
  import { fade } from "svelte/transition";
  import { state } from "../stores";
  import { _ } from "svelte-i18n";

  import Placeholder from "../shared/Placeholder.svelte";
  import Cloud from "./Export/Cloud.svelte";
</script>

<style type="text/css">
  .export-container {
    margin: auto;
    max-width: 800px;
    height: calc(90vh - 5rem);
    display: grid;
    grid-template-columns: 1fr 4fr;
    grid-template-rows: 4rem auto;
    grid-template-areas:
      "export-header export-header"
      "export-sidebar export-templates";
  }

  .header {
    grid-area: export-header;
  }

  .sidebar {
    grid-area: export-sidebar;
  }

  .templates {
    grid-area: export-templates;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-start;
    overflow-y: auto;
  }

  .templates img {
    padding: 1rem;
  }
</style>

<div class="export-container" in:fade={{ duration: 100 }}>
  {#if $state.currentProject}
    <div class="header">
      <h2>Export</h2>
    </div>
    <div class="sidebar">
      <div class="field vertical">
        <label class="big" for="title">{$_('export.title')}</label>
        <input
          id="title"
          type="text"
          placeholder="Moby Dick"
          autocomplete="off" />
      </div>
      <div class="field vertical">
        <label class="big" for="author">{$_('export.author')}</label>
        <input
          id="author"
          type="text"
          placeholder="John Doe"
          autocomplete="off" />
      </div>
    </div>
    <div class="templates">
      <img src="http://lorempixel.com/260/440/" />
      <img src="http://lorempixel.com/260/440/" />
      <img src="http://lorempixel.com/260/440/" />
      <img src="http://lorempixel.com/260/440/" />
      <img src="http://lorempixel.com/260/440/" />
      <img src="http://lorempixel.com/260/440/" />
      <img src="http://lorempixel.com/260/440/" />
    </div>
  {:else}
    <Placeholder />
  {/if}
</div>
