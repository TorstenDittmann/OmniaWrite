<script>
import { getRandomNumber } from "../utils"
import Field from "./shared/Field.svelte";

export let label;
export let id = label + getRandomNumber();

export let value;
export let autocomplete;
export let placeholder;


</script>

<Field bind:id bind:label >
  <input
    id={id}
    autocomplete={autocomplete}
    placeholder={placeholder}
    type="text"
    bind:value />
</Field>