<script>
  export let id;
  export let label;

  export let helper;
</script>

<style>
  div {
    margin: 0.5rem 0;
    text-align: left;
  }

  label {
    text-align: left;
    font-weight: bold;
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
      flex: 0 1 10rem;
    }

    div {
      flex: 0 1 12rem;
    }
  }
</style>

<div class="field">
  {#if label}
    <label for={id}>{label}</label>
  {/if}
  <div>
    <slot />
    {#if helper}
      <small>{helper}</small>
    {/if}
  </div>
</div>
