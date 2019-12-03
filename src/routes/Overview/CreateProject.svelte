<script>
  import { projects } from "../../stores";
  import { createEventDispatcher } from "svelte";

  import Modal from "../../shared/Modal.svelte";

  const dispatch = createEventDispatcher();

  export let showCreateProject;

  function createProject() {
    let retValue = projects.createProject(
      document.getElementById("createProjectInput").value
    );
    showCreateProject = false;
    dispatch("changeProject", {
      project: retValue
    });
  }
</script>

<style>

</style>

<Modal bind:show={showCreateProject}>
  <h2 slot="header">New project</h2>
  <div class="field">
    <label for="createProjectInput">Title:</label>
    <input
      id="createProjectInput"
      autocomplete="off"
      placeholder="enter your title"
      type="text" />
  </div>

  <hr />
  <div class="btn-group">
    <button on:click={createProject}>Create!</button>
  </div>
</Modal>
