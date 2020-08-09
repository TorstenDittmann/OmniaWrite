<script>
  import { fade } from "svelte/transition";
  import { state, projects, chapters, scenes, settings } from "../stores";
  import { reloadWindow } from "../bridge";
  import { _ } from "svelte-i18n";
  import { Input, ButtonGroup, Button } from "../components/Forms";
  import { Grid, GridElement } from "../components/Grid";

  import moment from "moment";
  import "moment/locale/de";
  import CreateProject from "./Overview/CreateProject.svelte";
  import ProjectOverview from "./Overview/Project.svelte";
  import Modal from "../shared/Modal.svelte";

  moment.locale($settings.language);

  let showCreateProject = false;

  const changeProject = (project) => {
    state.setCurrentProject(project);
    projects.updateProjectTimestamp(project);
    reloadWindow();
  };

  const sort = (b, a) => {
    if (a.lastOpen < b.lastOpen) {
      return -1;
    }
    if (a.lastOpen > b.lastOpen) {
      return 1;
    }
    return 0;
  };
</script>

<style>
  .overview {
    max-width: 800px;
    margin: auto;
    text-align: center;
  }
</style>

<CreateProject
  bind:showCreateProject
  on:changeProject={(event) => changeProject(event.detail.project)} />

<div in:fade={{ duration: 100 }} class="overview">
  {#each $projects.filter((project) => project.id == $state.currentProject) as project}
    <h1>{project.title}</h1>
    <ProjectOverview />
  {/each}
  <h1>{$_('overview.projects.title')}</h1>
  <Grid>
    <GridElement action="true" on:click={() => (showCreateProject = true)}>
      <span class="lnr lnr-plus-circle" />
    </GridElement>
    {#each $projects.sort(sort) as project}
      <GridElement
        title={project.title}
        on:click={() => changeProject(project.id)}>
        <p>
          {$_('overview.projects.opened')}
          {moment(project.lastOpen, 'X').fromNow()}
        </p>
        <p>
          {$_('overview.project.chapters')}: {$chapters.filter((n) => n.project == project.id).length}
        </p>
      </GridElement>
    {/each}
  </Grid>
</div>
