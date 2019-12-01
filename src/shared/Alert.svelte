<script lang="javascript">
  import { createEventDispatcher } from "svelte";
  import { fade, fly } from "svelte/transition";

  export let show = false;

  export let danger = false;
  export let success = false;
  export let info = false;
  export let warning = false;

  export let duration = 10000;

  $: {
    if (show) {
      setTimeout(() => {
        show = false;
      }, duration);
    }
  }
</script>

<style type="text/css">
  .alert {
    padding: 20px;
  }

  .alert.danger {
    background-color: #f44336;
  }

  .alert.success {
    background-color: #4caf50;
  }

  .alert.info {
    background-color: #2196f3;
  }

  .alert.warning {
    background-color: #ff9800;
  }

  .alert span {
    line-height: normal;
  }

  .closebtn {
    color: white;
    float: right;
    line-height: 1rem;
    font-size: 1rem;
    cursor: pointer;
    transition: 0.3s;
    opacity: 0.65;
  }

  .closebtn:hover {
    opacity: 1;
  }
</style>

{#if show}
  <div class="alert" class:danger class:success class:warning class:info>
    <span class="closebtn" on:click={() => (show = false)}>
      <span class="lnr lnr-cross" />
    </span>
    <slot name="title" />
    <slot />
  </div>
{/if}
