<script>
export let id;
export let label;
</script>

<div class="field">
  <label for={id}>{label}</label>
  <slot />
</div>