<script>
    import {
        state,
        projects,
        chapters,
        scenes
    } from "../stores";

    import Modal from '../shared/Modal.svelte';

    let showCreateProject = false;
    let wordCount;

    $: {
        wordCount = 0;
        chapters.subscribe(chapters => {
            chapters.filter(chapter => chapter.project == $state.currentProject).forEach(chapter => {
                scenes.subscribe(scenes => {
                    scenes.filter(scene => scene.chapter == chapter.id).forEach(scene => {
                        scene.content.blocks.forEach(block => {
                            wordCount += block.data.text.split(" ").length;
                        })
                    })
                })
            });
        })
    }

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

    function countWords(project) {
        chapters.subscribe(chapters => {
            chapters.filter(chapter => chapter.project == project).forEach(chapter => {
                scenes.subscribe(scenes => {
                    scenes.filter(scene => scene.chapter == chapter.id).forEach(scene => {
                        console.log(scene.size);
                    })
                })
            });
        })
        return 0;
    }
</script>

<Modal bind:show={showCreateProject}>
    <h2 slot="header">
        New 'project'
        <small><em>noun</em> proj·​ect \ ˈprä-ˌjekt</small>
    </h2>
    <div class="field">
        <label for="createProjectInput">Title:</label>
        <input id="createProjectInput" autocomplete="off" placeholder="enter your title">
    </div>
    <hr>
    <div class="btn-group">
        <button on:click={createProject}>Create!</button>
    </div>
</Modal>

{#each $projects.filter(project => project.id == $state.currentProject) as project}
<h1>{project.title}</h1>
<div class="field">
    <label class="big" for="author">Project ID:</label>
    {project.id}
</div>
<div class="field">
    <label class="big" for="author">Title:</label>
    <input id="author" type="text" placeholder="John Doe" autocomplete="off" bind:value={project.title}>
</div>
<div class="field">
    <label for="words" class="big">Words:</label>
    {wordCount} words
</div>
<div class="btn-group">
    <button on:click={()=> setProjectTitle(project.id)}>Save</button>
</div>
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