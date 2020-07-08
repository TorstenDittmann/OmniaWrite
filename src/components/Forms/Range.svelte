<script>
  import { getRandomNumber } from "../../utils";
  import { Field } from ".";

  export let label;
  export let id = label + getRandomNumber();

  export let value;
  export let min;
  export let max;
  export let step;

  export let helper;
</script>

<style>
  input {
    width: 100%;
  }
</style>

<Field bind:id bind:label bind:helper>
  <input {id} {min} {max} {step} type="range" bind:value />
</Field>
