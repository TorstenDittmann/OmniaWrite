<script>
  import { fade } from "svelte/transition";
  import { state } from "../stores";
  import { _ } from "svelte-i18n";
  import { Grid, GridElement } from "../components/Grid";

  import Placeholder from "../shared/Placeholder.svelte";
  import Modal from "../shared/Modal.svelte";
  import Cloud from "./Export/Cloud.svelte";
  import RTF from "./Export/RTF.svelte";
  import Markdown from "./Export/Markdown.svelte";

  const types = [
    {
      title: $_("export.rtf.title"),
      subtitle: $_("export.rtf.subtitle"),
      component: RTF,
    },
    {
      title: $_("export.markdown.title"),
      subtitle: $_("export.markdown.subtitle"),
      component: Markdown,
    },
  ];

  let selected = false;
  let selectedComponent;
</script>

<Modal bind:show={selected}>
  <h2 slot="header">{selectedComponent.title}</h2>
  <svelte:component this={selectedComponent.component} />
</Modal>
<div class="export" in:fade={{ duration: 100 }}>
  {#if $state.currentProject}
    <Grid>
      <GridElement
        on:click={() => ([selected, selectedComponent] = [true, { title: $_('export.cloud.title'), component: Cloud }])}>
        <h1>{$_('export.cloud.title')}</h1>
        <p>{$_('export.cloud.subtitle')}</p>
      </GridElement>
    </Grid>
    <Grid>
      {#each types as type}
        <GridElement
          on:click={() => ([selected, selectedComponent] = [true, type])}>
          <h1>{type.title}</h1>
        </GridElement>
      {/each}
    </Grid>
  {:else}
    <Placeholder />
  {/if}
</div>

<style>
  .export {
    margin: auto;
    max-width: 800px;
  }
</style>
