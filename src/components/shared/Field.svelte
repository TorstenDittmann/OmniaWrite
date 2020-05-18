<script>
  export let id;
  export let label;
</script>

<style>
  div {
    margin: 1.5rem 0;
  }
  @media (min-width: 960px) {
    .field {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin: 1rem 0;
    }
    label {
      flex: 0 1 8rem;
    }
    div {
      flex: 0 1 20rem;
    }
  }
</style>

<div class="field">
  <label for={id}>{label}</label>
  <div>
    <slot />
  </div>
</div>
