<script>
  export let label;
</script>

<td data-th={label}>
  <slot />
</td>

<style lang="scss">
  td {
    text-align: left;
    display: block;
    border-bottom: 1px darkgrey outset;

    &:first-child {
      padding-top: 1rem;
    }

    &:before {
      content: attr(data-th) ": ";
      font-weight: bold;
      width: 10em;
      display: inline-block;

      @media (min-width: 960px) {
        display: none;
      }
    }

    @media (min-width: 960px) {
      display: table-cell;
      padding: 0.25rem 0.5rem;

      &:first-child {
        padding-left: 0;
      }

      &:last-child {
        padding-right: 0;
      }
    }
  }
</style>
