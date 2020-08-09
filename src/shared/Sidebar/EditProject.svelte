<script>
  import { onMount } from "svelte";
  import { _ } from "svelte-i18n";
  import { projects, chapters, scenes, state } from "../../stores";
  import { electronIPC } from "../../utils";
  import { Input, Button, ButtonGroup } from "../../components/Forms";

  import Modal from "../../shared/Modal.svelte";

  export let show = false;
  export let id;

  let value = "";

  onMount(() => {
    value = $projects.filter((project) => project.id == id)[0].title;
  });

  const save = () => {
    if (value.length > 0) {
      projects.setProjectTitle(id, value);
      show = false;
    }
  };

  const removeProject = (project) => {
    let confirmed = confirm($_("overview.project.confirmDelete"));
    if (confirmed == true) {
      $chapters
        .filter((ch) => ch.project == project)
        .forEach((chapter) => {
          scenes.removeAllScenes(chapter.id);
        });
      chapters.removeAllChapters(project);
      projects.removeProject(project);

      scenes.removeAllScenes(project);
      state.setCurrentProject(false);
      electronIPC.reload();
    }
  };
</script>

<style>

</style>

<Modal bind:show>
  <form on:submit|preventDefault={save}>
    <Input
      label={$_('overview.project.title')}
      bind:value
      autofocus="true"
      autocomplete="off"
      placeholder={$_('placeholder.title')} />
    <ButtonGroup>
      <Button on:click={() => save()} disabled={value.length === 0}>
        {$_('overview.project.save')}
      </Button>
      <Button on:click={() => removeProject(id)} color="red">
        {$_('overview.project.delete')}
      </Button>
    </ButtonGroup>
  </form>
</Modal>
