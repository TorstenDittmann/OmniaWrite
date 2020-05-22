<style>
  div.button-group {
    margin: 1rem;
    justify-content: center;
    display: flex;
  }
  div.button-group:after {
    content: "";
    clear: both;
    display: table;
  }
</style>

<div class="button-group">
  <slot />
</div>
