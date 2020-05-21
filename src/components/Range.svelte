<script>
  import { getRandomNumber } from "../utils";
  import Field from "./shared/Field.svelte";

  export let label;
  export let id = label + getRandomNumber();

  export let value;
  export let min;
  export let max;
  export let step;
</script>

<style>

</style>

<Field bind:id bind:label>
  <input
    {id}
    {min}
    {max}
    {step}
    type="range"
    bind:value />
</Field>
