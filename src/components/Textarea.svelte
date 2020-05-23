<script>
  import { getRandomNumber } from "../utils";
  import Field from "./shared/Field.svelte";

  export let label;
  export let id = label + getRandomNumber();

  export let value;
</script>

<style>
  textarea {
    width: 100%;
    height: auto;
    resize: vertical;
    background: none;
    border: 1px solid #999;
    color: var(--text-color);
    border-radius: 0.125rem;
    font-size: 0.8rem;
    opacity: 0.65;
  }
  textarea:focus {
    opacity: 1;
  }
</style>

<Field bind:id bind:label>
  <textarea {id} rows="10" bind:value />
</Field>
