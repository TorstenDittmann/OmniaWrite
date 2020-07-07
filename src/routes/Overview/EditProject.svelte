<script>
  import { createEventDispatcher, onMount } from "svelte";
  import { _ } from "svelte-i18n";

  import { projects, chapters, scenes } from "../../stores";
  import { electronIPC } from "../../utils"

  import Modal from "../../shared/Modal.svelte";

  import Input from "../../components/Input.svelte";
  import ButtonGroup from "../../components/ButtonGroup.svelte";
  import Button from "../../components/Button.svelte";

  const dispatch = createEventDispatcher();

  export let showEditProject = false;
  export let id;

  let value;

  onMount(() => {
    value = $projects.filter((project) => project.id == id)[0].title;
  });

  const save = () => {
    if (value.length > 0) {
      projects.setProjectTitle(id, value);
      showEditProject = false;
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
      state.setCurrentProject("");
      electronIPC.reload();
    }
  };
</script>

<style>

</style>

<Modal bind:show={showEditProject}>
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
