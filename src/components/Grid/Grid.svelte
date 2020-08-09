<script>
  export let columns = 2;
</script>

<style lang="scss">
  .grid {
    display: grid;

    &.two {
      grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    }
    &.four {
      grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
    }
  }
</style>

<div class="grid" class:four={columns === 4} class:two={columns === 2}>
  <slot />
</div>
