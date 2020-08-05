<script>
  import { onMount } from "svelte";
  import { _ } from "svelte-i18n";
  import Modal from "./Modal.svelte";
  import Spinner from "./Spinner.svelte";

  export let show = true;

  const changelog = import(
    /* webpackChunkName: "changelog" */ "../changelog.json"
  );
</script>

<Modal bind:show>
  <h2 slot="header">{$_('common.update.title')}</h2>
  {#await changelog}
    <Spinner />
  {:then data}
    {#if data.changes}
      <h3>{data.name}</h3>
      {@html data.body}
    {:else}{$_('common.update.noChangelog')}{/if}
  {/await}
</Modal>
