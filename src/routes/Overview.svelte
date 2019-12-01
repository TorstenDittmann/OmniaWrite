<script lang="javascript">
  import { state, projects, chapters, scenes, settings } from "../stores";

  import { deskgap } from "../utils";

  import { _ } from "svelte-i18n";

  import CreateProject from "./Overview/CreateProject.svelte";

  import moment from "moment";
  import "moment/locale/de";

  moment.locale($settings.language);

  let showCreateProject = false;
  let chapterCount;
  let sceneCount;
  let wordCount;
  let charCount;

  let firstProject = $projects.length == 0 ? true : false;
  showCreateProject = firstProject;

  $: {
    chapterCount = 0;
    sceneCount = 0;
    wordCount = 0;
    charCount = 0;
    chapters.subscribe(chapters => {
      chapters
        .filter(chapter => chapter.project == $state.currentProject)
        .forEach(chapter => {
          chapterCount++;
          scenes.subscribe(scenes => {
            scenes
              .filter(scene => scene.chapter == chapter.id)
              .forEach(scene => {
                sceneCount++;
                if (scene.content) {
                  scene.content.blocks.forEach(block => {
                    wordCount += block.data.text.split(" ").length;
                    charCount += block.data.text.length;
                  });
                }
              });
          });
        });
    });
  }

  function changeProject(project) {
    state.setCurrentProject(project);
    projects.updateProjectTimestamp(project);
    deskgap.reload();
  }

  function setProjectTitle(project) {
    projects.setProjectTitle(
      project,
      document.getElementById("newProjectTitle").value
    );
  }

  function sort(b, a) {
    if (a.lastOpen < b.lastOpen) {
      return -1;
    }
    if (a.lastOpen > b.lastOpen) {
      return 1;
    }
    return 0;
  }
</script>

<CreateProject
  {showCreateProject}
  {firstProject}
  on:changeProject={event => changeProject(event.detail.project)} />

{#each $projects.filter(project => project.id == $state.currentProject) as project}
  <h1>{project.title}</h1>
  <div class="field">
    <label class="big" for="author">{$_('overview.project.title')}:</label>
    <input
      id="author"
      type="text"
      autocomplete="off"
      bind:value={project.title} />
  </div>
  <div class="field">
    <label for="chapters" class="big">{$_('overview.project.chapters')}:</label>
    {chapterCount}
  </div>
  <div class="field">
    <label for="scenes" class="big">{$_('overview.project.scenes')}:</label>
    {sceneCount}
  </div>
  <div class="field">
    <label for="words" class="big">{$_('overview.project.words')}:</label>
    {wordCount}
  </div>
  <div class="field">
    <label for="chars" class="big">{$_('overview.project.characters')}:</label>
    {charCount}
  </div>
  <div class="btn-group">
    <button on:click={() => setProjectTitle(project.id)}>
      {$_('overview.project.save')}
    </button>
  </div>
{/each}
<h1>{$_('overview.projects.title')}</h1>
<div class="grid">
  <div class="new" on:click={() => (showCreateProject = true)}>
    <span class="lnr lnr-plus-circle" />
  </div>
  {#each $projects.sort(sort) as project}
    <div on:click={() => changeProject(project.id)}>
      <h2>{project.title}</h2>
      <p>
        {$_('overview.projects.opened')}
        {moment(project.lastOpen, 'X').fromNow()}
      </p>
      <p>
        {$_('overview.project.chapters')}: {$chapters.filter(n => n.project == project.id).length}
      </p>
    </div>
  {/each}
</div>
