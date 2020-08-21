<script>
  export let small;
</script>

<div class="button-group" class:small>
  <slot />
</div>

<style lang="scss">
  div.button-group {
    margin: 1rem;
    justify-content: center;
    display: flex;

    &.small {
      margin: 0.5rem;
    }

    &:after {
      content: "";
      clear: both;
      display: table;
    }
  }
</style>
