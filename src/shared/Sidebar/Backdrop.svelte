<script>
  export let state;
</script>

<style lang="scss">
  @import "../../css/mixins/devices";

  .backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.85);
    z-index: -1;

    @include desktop {
      display: none;
    }
  }
</style>

{#if state}
  <div
    class="backdrop"
    on:click={() => (state = false)}
    style="-webkit-app-region: no-drag" />
{/if}
