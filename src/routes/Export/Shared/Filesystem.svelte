<script>
  import { _ } from "svelte-i18n";
  export let uri;
</script>

<p><b>{$_('export.finished.savedTo')}</b></p>
<p class="path">{uri}</p>

<style lang="scss">
  .path {
    word-break: break-all;
  }
</style>
