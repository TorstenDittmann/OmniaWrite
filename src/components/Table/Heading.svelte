<script>

</script>

<style lang="scss">
  th {
    display: none;
    text-align: left;
    min-width: 12rem;

    @media (min-width: 960px) {
      display: table-cell;
      padding: 0.25em 0.5em;

      &:first-child {
        padding-left: 0;
      }

      &:last-child {
        padding-right: 0;
      }
    }
  }
</style>

<th>
  <slot />
</th>
