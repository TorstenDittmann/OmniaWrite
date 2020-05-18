<script>
import { getRandomNumber } from "../utils"
import Field from "./shared/Field.svelte";

export let label;
export let id = label + getRandomNumber();

export let value;


</script>

<Field bind:id bind:label >
  <textarea
    id={id}
    rows="10"
    bind:value />
</Field>