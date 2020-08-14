<script>
  import { fly } from "svelte/transition";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let show = false;
  export let text = "A notification message..";
  export let duration = 5000;

  $: {
    if (show && duration != "forever") {
      setTimeout(() => {
        show = false;
      }, duration);
    }
  }
</script>

<style type="scss">
  div {
    width: 100%;
    background-color: var(--snackbar);
    color: var(--text-color);
    text-align: center;
    padding: 1rem;
    position: fixed;
    z-index: 9999;
    bottom: 0;
    right: 0;
  }
  @media (min-width: 960px) {
    div {
      width: 18rem;
      border-radius: 1rem;
      bottom: 1rem;
      right: 1rem;
    }
  }
</style>

{#if show}
  <div
    on:click={() => {
      dispatch('click');
    }}
    in:fly={{ y: -100, duration: 500 }}
    out:fly={{ x: 100, duration: 500 }}>
    {@html text}
    <slot />
  </div>
{/if}
