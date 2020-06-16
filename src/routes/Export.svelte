<script>
  import { fade } from "svelte/transition";
  import { state } from "../stores";
  import { _ } from "svelte-i18n";

  import Placeholder from "../shared/Placeholder.svelte";
  import Modal from "../shared/Modal.svelte";

  import Cloud from "./Export/Cloud.svelte";
  import RTF from "./Export/RTF.svelte";

  const types = [
    {
      title: "EPUB",
      component: Cloud,
    },
    {
      title: "RTF",
      component: RTF,
    },
  ];

  let selected = false;
  let selectedComponent;
</script>

<style>
  .export {
    margin: auto;
  }
</style>

<Modal bind:show={selected}>
  <svelte:component this={selectedComponent} />
</Modal>
<div class="export" in:fade={{ duration: 100 }}>
  {#if $state.currentProject}
    <div id="cards" class="grid">
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
