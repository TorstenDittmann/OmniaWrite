<script>
  import {
    state,
    projects,
    chapters
  } from "../stores";

  import Modal from '../shared/Modal.svelte';


  let showCreateProject = false;

  function changeProject(project) {
    state.setCurrentProject(project);
    location.reload();
  }

  function setProjectTitle(project) {
    projects.setProjectTitle(project, document.getElementById("newProjectTitle").value);
  }
</script>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    /* Umbrechen, sobald die Box 300 Pixel Breite hat */
  }

  .grid div {
    background: #28404d;
    border: 2px solid #495865;
    color: white;
    margin: 1em;
    padding: 1em;
    cursor: pointer;
    opacity: .65;
  }

  .grid .new {
    text-align: center;
    font-size: 3rem;
  }


  .grid div:hover {
    opacity: 1;
  }
</style>

{#if showCreateProject}
	<Modal on:close="{() => showCreateProject = false}">
		<h2 slot="header">
			New 'project'
			<small><em>noun</em> proj·​ect \ ˈprä-ˌjekt</small>
		</h2>
    <div class="field">
      <label for="editChapterInput">Title:</label>
      <input id="editChapterInput" autocomplete="off"
        placeholder="enter your title">
    </div>
    <hr>
    <div class="btn-group">
      <button>Create!</button>    
    </div>
	</Modal>
{/if}

{#each $projects.filter(project => project.id == $state.currentProject) as project}
<p>Opened project :{project.id}</p>
<p>Title: <input id="newProjectTitle" type="text" value={project.title}></p>
<button on:click={() => setProjectTitle(project.id)}>Save</button>
<hr>
{/each}
<h1>Your projects</h1>
<div class="grid">
  <div class="new" on:click={() => showCreateProject = true}>
    <i class="icon-plus"></i>
  </div>
  {#each $projects as project}
    <div on:click={()=> changeProject(project.id)}>
      <h2>{project.title}</h2>
      <p>ID: {project.id}</p>
      <p>Chapters: {$chapters.filter(n => n.project == project.id).length}</p>
    </div>
  {/each}
</div>