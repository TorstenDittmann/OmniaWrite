<script>
  import Download from "./Download.svelte";
  import Filesystem from "./Filesystem.svelte";

  export let file;
</script>

{#if file.type === "download"}
  <Download {...file} />
{/if}
{#if file.type === "filesystem"}
  <Filesystem {...file} />
{/if}
