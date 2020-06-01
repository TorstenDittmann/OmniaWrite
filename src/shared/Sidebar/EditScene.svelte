<script>
  import { createEventDispatcher } from "svelte";
  import { _ } from "svelte-i18n";
  import { push } from "svelte-spa-router";

  import { state, scenes } from "../../stores";

  import Modal from "../../shared/Modal.svelte";
  import Input from "../../components/Input.svelte";
  import ButtonGroup from "../../components/ButtonGroup.svelte";
  import Button from "../../components/Button.svelte";

  export let show;
  export let data;

  const editScene = () => {
    scenes.setSceneTitle(data.id, data.title);
    show = false;
  };

  const removeScene = (sceneId) => {
    let confirmed = confirm($_("sidebar.delete.scene"));
    if (confirmed == true) {
      show = false;
      push("/write");
      window.setTimeout(() => scenes.removeScene(sceneId), 200);
    }
  };
</script>

<style>

</style>

<Modal bind:show>
  <h2 slot="header">{data.title}</h2>
  <form on:submit|preventDefault={editScene}>
    <Input
      label={$_('sidebar.modal.title')}
      bind:value={data.title}
      autocomplete="off"
      placeholder={$_('placeholder.title')} />

    <ButtonGroup>
      <Button on:click={editScene} disabled={data.title.length === 0}>
        {$_('sidebar.modal.edit.buttonSave')}
      </Button>
      <Button on:click={() => removeScene(data.id)} color="red">
        {$_('sidebar.modal.edit.buttonDelete')}
      </Button>
    </ButtonGroup>
  </form>
</Modal>
