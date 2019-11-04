<script>
  import {
    state,
    projects
  } from "../stores";

  function changeProject(project) {
    state.setCurrentProject(project);
    location.reload();
  }

  function setProjectTitle(project) {
    projects.setProjectTitle(project, document.getElementById("newProjectTitle").value);
  }
</script>
{#each $projects.filter(project => project.id == $state.currentProject) as project}
<p>Opened project :{project.id}</p>
<p>Title: <input id="newProjectTitle" type="text" value={project.title}></p>
<button on:click={() => setProjectTitle(project.id)}>Save</button>
<hr>
{/each}
<ul>
  {#each $projects as project}
    <li on:click={() => changeProject(project.id)}>{project.title}</li>
  {/each}
</ul>