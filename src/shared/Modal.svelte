<script>
  import { createEventDispatcher } from "svelte";
  import { fade, scale } from "svelte/transition";

  export let show = false;
  export let fullscreen = false;
  export let persistent = false;

  const handleKeydown = (event) => {
    if (event.keyCode === 27 && !persistent) {
      event.preventDefault();
      show = false;
    }
  };
</script>

<style lang="scss">
  @import "../css/mixins/devices";

  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 998;
  }
  .modal {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 100vw;
    max-height: 100vh;
    overflow: auto;
    transform: translate(-50%, -50%);
    border-radius: 0.2em;
    background-color: var(--background-color);
    z-index: 999;
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: 4em auto;
    grid-template-areas: "modal-header" "modal-content";

    @include desktop {
      max-width: 32rem;
      max-height: 80vh;
    }

    .modal-header {
      height: 100%;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: space-between;
      align-content: stretch;
      align-items: center;
      padding: 0 1rem;
      background-color: var(--menu-active);

      .modal-close {
        font-size: 1.5rem;
        opacity: 0.65;
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
          opacity: 1;
          transform: scale(1.25);
        }
      }
    }

    .modal-content {
      overflow: auto;
      max-height: calc(100vh - 4rem);
      padding: 0 0.5rem;

      @include desktop {
        max-height: calc(80vh - 4rem);
      }
    }

    &.fullscreen {
      max-width: 100vw;
      height: 100vh;
      max-height: 100vh;
      width: 100vw;
      text-align: center;
      background-color: var(--secondary-color);
    }
  }
</style>

<svelte:window on:keydown={handleKeydown} />
{#if show}
  <div
    class="modal-backdrop"
    on:click={() => (persistent ? '' : (show = false))}
    in:fade={{ duration: 200 }}
    out:fade={{ duration: 200 }} />
  <div
    class="modal"
    in:scale={{ duration: 200 }}
    out:scale={{ duration: 200 }}
    class:fullscreen>
    <div class="modal-header">
      <slot name="header" />
      {#if !persistent}
        <div class="modal-close" on:click={() => (show = false)}>
          <span class="lnr lnr-cross" />
        </div>
      {/if}
    </div>
    <div class="modal-content">
      <slot />
    </div>
  </div>
{/if}
