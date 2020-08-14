<script>
  import { _ } from "svelte-i18n";
  import { push } from "svelte-spa-router";

  import { scenes } from "../../stores";
  import { Input, ButtonGroup, Button } from "../../components/Forms";

  import Modal from "../Modal.svelte";

  export let show;
  export let chapter;

  let title = "";

  const createScene = () => {
    const id = scenes.createScene(chapter, title);
    show = false;
    title = "";
    push("/write/" + id);
  };
</script>

<style>

</style>

<Modal bind:show>
  <h2 slot="header">{$_("sidebar.modal.newScene.header")}</h2>
  <form on:submit|preventDefault={createScene}>
    <Input
      label={$_("sidebar.modal.title")}
      bind:value={title}
      autofocus="true"
      autocomplete="off"
      placeholder={$_("placeholder.title")} />
    <ButtonGroup>
      <Button on:click={createScene} disabled={title.length === 0}>
        {$_("sidebar.modal.newScene.button")}
      </Button>
    </ButtonGroup>
  </form>
</Modal>
