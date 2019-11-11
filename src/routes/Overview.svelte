<script>
  import {
    state,
    projects,
    chapters
  } from "../stores";

  import Modal from '../shared/Modal.svelte';

  let showCreateProject = false;

  function createProject() {
    let retValue = projects.createProject(document.getElementById("createProjectInput").value);
    showCreateProject = false;
    changeProject(retValue);
  }

  function changeProject(project) {
    state.setCurrentProject(project);
    location.reload();
  }

  function setProjectTitle(project) {
    projects.setProjectTitle(project, document.getElementById("newProjectTitle").value);
  }
</script>

{#if showCreateProject}
	<Modal on:close="{() => showCreateProject = false}">
		<h2 slot="header">
			New 'project'
			<small><em>noun</em> proj·​ect \ ˈprä-ˌjekt</small>
		</h2>
    <div class="field">
      <label for="createProjectInput">Title:</label>
      <input id="createProjectInput" autocomplete="off"
        placeholder="enter your title">
    </div>
    <hr>
    <div class="btn-group">
      <button on:click={createProject}>Create!</button>    
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