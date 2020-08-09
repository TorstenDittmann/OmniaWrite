<script>
  export let state;
  export let right = true;
</script>

<style lang="scss">
  @import "../../css/mixins/devices";

  .close {
    font-size: 2rem;
    position: fixed;
    top: 0.5rem;
    left: 1.5rem;
    right: auto;

    &.right {
      right: 1.5rem;
      left: auto;
    }

    @include desktop {
      display: none;
    }
  }
</style>

{#if state}
  <div
    class="close"
    class:right
    on:click={() => (state = false)}
    style="-webkit-app-region: no-drag">
    <span class="lnr lnr-cross" />
  </div>
{/if}
