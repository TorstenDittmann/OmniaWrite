<script>
  export let id;
  export let label;
</script>

<style>
  div {
    margin: 0.5rem 0;
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
      text-align: left;
      font-weight: bold;
      flex: 0 1 10rem;
    }

    div {
      flex: 0 1 12rem;
    }
  }
</style>

<div class="field">
  <label for={id}>{label}</label>
  <div>
    <slot />
  </div>
</div>
