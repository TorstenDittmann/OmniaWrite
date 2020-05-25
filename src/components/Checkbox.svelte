<script>
  import { getRandomNumber } from "../utils";
  import Field from "./shared/Field.svelte";

  export let label;
  export let id = label + getRandomNumber();

  export let value;
  export let helper;
</script>

<style>
  input {
    display: none;
  }
  input,
  input:after,
  input:before,
  input + label {
    box-sizing: border-box;
  }
  input::-moz-selection,
  input:after::-moz-selection,
  input:before::-moz-selection,
  input + label::-moz-selection {
    background: none;
  }
  input::selection,
  input:after::selection,
  input:before::selection,
  input + label::selection {
    background: none;
  }
  input + label {
    margin: auto;
    outline: 0;
    display: block;
    width: 3em;
    height: 1.5em;
    position: relative;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background: grey;
    border-radius: 2em;
    padding: 2px;
    -webkit-transition: all 0.4s ease;
    transition: all 0.4s ease;
  }
  input + label:after,
  input + label:before {
    position: relative;
    display: block;
    content: "";
    width: 50%;
    height: 100%;
  }
  input + label:after {
    left: 0;
    border-radius: 50%;
    background: #fff;
    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;
  }
  input + label:before {
    display: none;
  }
  input:checked + label:after {
    left: 50%;
  }
  input:checked + label {
    background: var(--primary-color);
  }
</style>

<Field bind:id bind:label bind:helper>
  <input {id} type="checkbox" bind:checked={value} />
  <label for={id} />
</Field>
