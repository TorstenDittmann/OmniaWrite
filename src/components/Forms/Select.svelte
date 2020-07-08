<script>
  import { getRandomNumber } from "../../utils";
  import { Field } from ".";

  export let label;
  export let id = label + getRandomNumber();

  export let value;
  export let options = [];
  export let helper;
</script>

<style>
  select {
    background-color: var(--select-background);
    width: 100%;
    font-size: 1rem;
    color: var(--text-color);
    -webkit-text-fill-color: var(--text-color);
    border: 0;
    cursor: pointer;
  }
</style>

<Field bind:id bind:label bind:helper>
  <select {id} bind:value>
    {#each options as option}
      <option value={option.value}>{option.text}</option>
    {/each}
  </select>
</Field>
