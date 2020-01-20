<script>
  import { _ } from "svelte-i18n";
  import { deskgap, isRunningElectron } from "../../utils";
</script>

<style>
  #cards {
    max-width: 800px;
  }
  #cards div {
    font-size: 1.5rem;
  }
</style>

{#if !isRunningElectron}
  <div id="cards" class="grid">

    <div class="new">
      <a href="https://trello.com/b/XmcZBEIl/omniawrite" target="_blank">
        <span class="lnr lnr-bug" />
        {$_('developementStatus')}
      </a>

    </div>
  </div>
{/if}
