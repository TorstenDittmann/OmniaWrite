<script lang="javascript">
  import { fade } from "svelte/transition";
  import { state } from "../stores";
  import { _ } from "svelte-i18n";

  import Placeholder from "../shared/Placeholder.svelte";
  import Cloud from "./Export/Cloud.svelte";
</script>

<style type="text/css">
  .header, .sidebar {
    position:sticky;
    background-color: var(--background-color);
  }
  .header {
    height: 4rem;
    top: 0;
    padding: .5rem 0;
  }
  .sidebar {
    top: 4rem;
    padding: .5rem 0;
  }
  
  .templates {
    grid-area: export-templates;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .cover {
    flex: 0 0 50%;
  }

  .cover img {
    max-width:90%;
    margin: .5rem;
  }

  @media (min-width: 960px) {
    .export-container {
      margin: auto;
      max-width: 800px;
      display: grid;
      grid-template-columns: 1fr 4fr;
      grid-template-rows: 4rem auto;
      grid-template-areas:
        "export-header export-header"
        "export-sidebar export-templates";
    }

    .header {
      grid-area: export-header;
      position: sticky;
      top: 0;
      display: flex;
    }

    .sidebar {
      grid-area: export-sidebar;
      position: sticky;
      top: 4rem;
      height: fit-content;
    }

    .export-action {
      margin-left: auto;
    }

    .btn-group button {
      width: 100%;
    }
  }
</style>

<div class="export-container" in:fade={{ duration: 100 }}>
  {#if $state.currentProject}
    <div class="header">
      <div class="btn-group export-action">
        <button on:click|preventDefault={()=> window.alert('xpört')}>
          {$_("exports.action")}
        </button>
      </div>
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
      <div class="cover">
        <img src="https://via.placeholder.com/260x440?text=Cover" />
      </div>
      <div class="cover">
        <img src="https://via.placeholder.com/260x440?text=Cover" />
      </div>
      <div class="cover">
        <img src="https://via.placeholder.com/260x440?text=Cover" />
      </div>
      <div class="cover">
        <img src="https://via.placeholder.com/260x440?text=Cover" />
      </div>
      <div class="cover">
        <img src="https://via.placeholder.com/260x440?text=Cover" />
      </div>
      <div class="cover">
        <img src="https://via.placeholder.com/260x440?text=Cover" />
      </div>
            <div class="cover">
        <img src="https://via.placeholder.com/260x440?text=Cover" />
      </div>
    </div>
  {:else}
    <Placeholder />
  {/if}
</div>
