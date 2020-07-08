<script>
  export let title;
  export let action = false;
</script>

<style lang="scss">
  .grid-element {
    background: var(--background-color);
    border: 2px solid rgba(0, 0, 0, 0.3);
    color: var(--text-color);
    margin: 1em;
    padding: 1em;
    cursor: pointer;
    opacity: 0.65;
    white-space: pre-line;
    line-height: 1.5rem;
    transition: transform 0.2s;

    h2 {
      margin: 0 0 1rem 0;
    }

    &.action {
      text-align: center;
      font-size: 3rem;
    }

    &:hover {
      opacity: 1;
      transform: scale(1.05);
      z-index: 997;
    }
  }
</style>

<div class="grid-element" class:action on:click>
  {#if title}
    <h2>{title}</h2>
  {/if}
  <slot />
</div>
