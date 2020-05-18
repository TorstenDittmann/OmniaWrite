<script>
  import { getRandomNumber } from "../utils";
  import Field from "./shared/Field.svelte";

  export let label;
  export let id = label + getRandomNumber();

  export let value;
</script>

<style>
  [type="checkbox"]:not(:checked),
  [type="checkbox"]:checked {
    position: absolute;
    left: -9999px;
  }

  [type="checkbox"]:not(:checked) + label,
  [type="checkbox"]:checked + label {
    position: relative;
    padding-left: 1.95em;
    cursor: pointer;
  }

  [type="checkbox"]:not(:checked) + label:before,
  [type="checkbox"]:checked + label:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 1.25em;
    height: 1.25em;
    border: 2px solid #ccc;
    background: #fff;
    border-radius: 4px;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  [type="checkbox"]:not(:checked) + label:after,
  [type="checkbox"]:checked + label:after {
    content: "\2713\0020";
    position: absolute;
    top: 0.15em;
    left: 0.22em;
    font-size: 1.3em;
    line-height: 0.8;
    color: #09ad7e;
    transition: all 0.2s;
    font-family: "Lucida Sans Unicode", "Arial Unicode MS", Arial;
  }

  [type="checkbox"]:not(:checked) + label:after {
    opacity: 0;
    transform: scale(0);
  }

  [type="checkbox"]:checked + label:after {
    opacity: 1;
    transform: scale(1);
  }

  [type="checkbox"]:disabled:not(:checked) + label:before,
  [type="checkbox"]:disabled:checked + label:before {
    box-shadow: none;
    border-color: #bbb;
    background-color: #ddd;
  }

  [type="checkbox"]:disabled:checked + label:after {
    color: #999;
  }

  [type="checkbox"]:disabled + label {
    color: #aaa;
  }

  [type="checkbox"]:checked:focus + label:before,
  [type="checkbox"]:not(:checked):focus + label:before {
    border: 2px dotted blue;
  }
</style>

<Field bind:id bind:label>
  <input {id} type="checkbox" bind:checked={value} />
  <label for={id} />
</Field>
