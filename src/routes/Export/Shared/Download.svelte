<script>
  import { _ } from "svelte-i18n";

  import ButtonGroup from "../../../components/Forms/ButtonGroup.svelte";
  import Button from "../../../components/Forms/Button.svelte";

  export let download;
</script>

<ButtonGroup>
  <Button on:click={download}>
    <span class="lnr lnr-download" />
    {$_('export.finished.download')}
  </Button>
</ButtonGroup>
