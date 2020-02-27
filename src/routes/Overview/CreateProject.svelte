<script>
  import { projects } from "../../stores";
  import { createEventDispatcher } from "svelte";

  import Modal from "../../shared/Modal.svelte";

  const dispatch = createEventDispatcher();

  export let showCreateProject;

  function createProject() {
    if (createProjectInput.length > 0) {
      let retValue = projects.createProject(createProjectInput);
      showCreateProject = false;
      dispatch("changeProject", {
        project: retValue
      });
    }
  }
</script>

<style>

</style>

<Modal bind:show={showCreateProject}>
  <h2 slot="header">New project</h2>
  <form on:submit|preventDefault={createProject}>
    <div class="field">
      <label for="createProjectInput">Title:</label>
      <input
        bind:value={createProjectInput}
        autocomplete="off"
        placeholder="enter your title"
        type="text" />
    </div>

    <hr />
    {#if createProjectInput.length > 0}
      <div class="btn-group">
        <button on:click={createProject}>Create!</button>
      </div>
    {/if}
  </form>
</Modal>
