<script>
  import { _ } from "svelte-i18n";
</script>

<div class="placeholder">
  <slot>{$_('common.no-project-selected')}</slot>
</div>

<style>
  .placeholder {
    position: relative;
    top: 50%;
    text-align: center;
    opacity: 0.5;
    font-style: italic;
  }
</style>
