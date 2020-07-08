<script>
  export let color;
  export let loading = false;
  export let disabled = false;
</script>

<style lang="scss">
  button {
    border: 1px solid;
    padding: 0.25em 1em;
    cursor: pointer;
    float: left;
    border-color: #0077b8;
    background-color: #0077b8;
    color: var(--button-color);
    opacity: 0.85;
    font-size: 1rem;
    height: 2rem;
    width: -webkit-fill-available;
    min-width: 4rem;
    max-width: 12rem;

    &:hover {
      opacity: 1;
    }

    &:not(:last-child) {
      border-right: none;
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.4;
      background-color: #313131;
    }

    &.green {
      border-color: #2e8500;
      background-color: #2e8500;
    }

    &.red {
      border-color: #e02200;
      background-color: #e02200;
    }

    &.outline {
      background-color: var(--background-color);
    }

    .spinner {
      display: none;
      -webkit-animation: spin 2s infinite linear;
      animation: spin 2s infinite linear;
    }

    &.loading {
      .spinner {
        display: inline-block;
      }
    }
  }
</style>

<button
  disabled={disabled || loading}
  class:loading
  class:green={color == 'green'}
  class:red={color == 'red'}
  class:outline={color == 'outline'}
  on:click|preventDefault>
  {#if loading}
    <span class="lnr lnr-sync spinner" />
  {/if}
  <slot />
</button>
