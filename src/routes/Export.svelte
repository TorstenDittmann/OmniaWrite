<script>
  import { fade } from "svelte/transition";
  import { state } from "../stores";
  import { _ } from "svelte-i18n";

  import Placeholder from "../shared/Placeholder.svelte";
  import Modal from "../shared/Modal.svelte";

  import Cloud from "./Export/Cloud.svelte";
  import RTF from "./Export/RTF.svelte";
  import Backup from "./Export/Backup.svelte";

  const types = [
    {
      title: "RTF",
      component: RTF,
    },
    {
      title: "Local Backup",
      component: Backup,
    }
  ];

  let selected = false;
  let selectedComponent;
</script>

<style>
  .export {
    margin: auto;
    max-width: 800px;
  }
</style>

<Modal bind:show={selected}>
  <svelte:component this={selectedComponent} />
</Modal>
<div class="export" in:fade={{ duration: 100 }}>
  {#if $state.currentProject}
    <div class="grid">
      <div on:click={() => ([selected, selectedComponent] = [true, Cloud])}>
        <h1>{$_('export.cloud.title')}</h1>
        <p>
          {$_('export.cloud.subtitle')}
        </p>
      </div>
    </div>
    <div class="grid">
      {#each types as type}
        <div
          on:click={() => ([selected, selectedComponent] = [true, type.component])}>
          <h1>{type.title}</h1>
        </div>
      {/each}
    </div>
  {:else}
    <Placeholder />
  {/if}
</div>
