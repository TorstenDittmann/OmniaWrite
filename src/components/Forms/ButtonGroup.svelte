<script>
  export let small;
</script>

<style lang="scss">
  div.button-group {
    margin: 1rem;
    justify-content: center;
    display: flex;

    &.small {
      margin: 0;
    }

    &:after {
      content: "";
      clear: both;
      display: table;
    }
  }
</style>

<div class="button-group" class:small>
  <slot />
</div>
