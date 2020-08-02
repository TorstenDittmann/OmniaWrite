<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  const click = (e) => {
    dispatch("click");
  };
</script>

<style lang="scss">
  tr {
    width: 100%;
    transition: all 0.5s ease;
    cursor: pointer;

    &:hover {
      background-color: var(--menu-active);
    }
  }
</style>

<tr on:click>
  <slot />
</tr>
