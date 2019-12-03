<script>
  import { _ } from "svelte-i18n";
</script>

<style>
  .placeholder {
    position: relative;
    top: 50%;
    text-align: center;
    opacity: 0.5;
    font-style: italic;
  }
</style>

<div class="placeholder">{$_('common.no-project-selected')}</div>
