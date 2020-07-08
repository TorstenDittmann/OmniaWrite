<script>
  import { getRandomNumber } from "../../utils";
  import { Field } from ".";

  export let label;
  export let id = label + getRandomNumber();

  export let value;
  export let helper;
</script>

<style lang="scss">
  input {
    display: none;
    &,
    &:after,
    &:before,
    & + label {
      box-sizing: border-box;
      &::selection {
        background: none;
      }
    }

    + label {
      outline: 0;
      display: block;
      width: 3em;
      height: 1.5em;
      position: relative;
      cursor: pointer;
      user-select: none;
      background: grey;
      border-radius: 2em;
      padding: 2px;
      transition: all 0.4s ease;
      &:after {
        border-radius: 50%;
        background: #fff;
        transition: all 0.2s ease;
      }
      &:after,
      &:before {
        position: relative;
        display: block;
        content: "";
        width: 50%;
        height: 100%;
      }

      &:after {
        left: 0;
      }

      &:before {
        display: none;
      }
    }
    &:checked + label {
      background: var(--primary-color);
    }
    &:checked + label:after {
      left: 50%;
    }
  }
</style>

<Field bind:id bind:label bind:helper>
  <input {id} type="checkbox" bind:checked={value} />
  <label for={id} />
</Field>
