<script>
  import { getRandomNumber } from "../utils";
  import Field from "./shared/Field.svelte";

  export let label;
  export let id = label + getRandomNumber();

  export let value;
  export let placeholder;
  export let helper;
  export let autocomplete = "off";
  export let required = false;
</script>

<style lang="scss">
  input {
    -webkit-appearance: none;
    -moz-appearance: none;
    -ms-appearance: none;
    -o-appearance: none;
    width: 100%;
    margin: 0;
    padding: 0 0.25rem;
    border: none;
    border-radius: 0;
    box-shadow: none;
    height: 1.2rem;
    color: var(--text-color);
    display: inline-block;
    border-bottom: 1px solid #999;
    max-height: 1.2rem;
    font-size: 1rem;
    opacity: 0.65;
    background: linear-gradient(
        to bottom,
        transparent 95%,
        var(--input-border-color) 95%
      )
      no-repeat;
    background-size: 0 100%;
    transition: background-size 0.2s ease;

    &:focus {
      border-bottom: 1px solid var(--input-border-color);
      background-size: 100% 100%;
      outline: 0;
      opacity: 1;
    }
  }
</style>

<Field bind:id bind:label bind:helper>
  <input {id} {autocomplete} {placeholder} {required} type="email" bind:value />
</Field>
