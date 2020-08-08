<script>
  import ButtonGroup from "../../../components/Forms/ButtonGroup.svelte";
  import Button from "../../../components/Forms/Button.svelte";

  export let download;
</script>

<ButtonGroup>
  <Button on:click={download}>
    <span class="lnr lnr-download" />
    Download
  </Button>
</ButtonGroup>
