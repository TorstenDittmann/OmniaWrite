<script>
    import {
        state,
        projects,
        chapters,
        scenes
    } from "../stores";

    import {
        deskgap
    } from "../utils";

    import {
        _
    } from 'svelte-i18n';

    import Modal from '../shared/Modal.svelte';

    let showCreateProject = false;
    let chapterCount;
    let sceneCount;
    let wordCount;
    let charCount;

    $: {
        chapterCount = 0;
        sceneCount = 0;
        wordCount = 0;
        charCount = 0;
        chapters.subscribe(chapters => {
            chapters.filter(chapter => chapter.project == $state.currentProject).forEach(chapter => {
                chapterCount++;
                scenes.subscribe(scenes => {
                    scenes.filter(scene => scene.chapter == chapter.id).forEach(scene => {
                        sceneCount++;
                        if (scene.content) {
                            scene.content.blocks.forEach(block => {
                                wordCount += block.data.text.split(" ").length;
                                charCount += block.data.text.length;
                            })
                        }

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
        deskgap.reload();
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
    <label for="chapters" class="big">Chapters:</label>
    {chapterCount}
</div>
<div class="field">
    <label for="scenes" class="big">Scenes:</label>
    {sceneCount}
</div>
<div class="field">
    <label for="words" class="big">Words:</label>
    {wordCount}
</div>
<div class="field">
    <label for="chars" class="big">Characters:</label>
    {wordCount}
</div>
<div class="btn-group">
    <button on:click={()=> setProjectTitle(project.id)}>Save</button>
</div>
<hr>
{/each}
{#if $projects.length != 0}
<h1>Your projects</h1>
<div class="grid">
  <div class="new" on:click={() => showCreateProject = true}>
    <span class="lnr lnr-plus-circle" />
  </div>
  {#each $projects as project}
    <div on:click={()=> changeProject(project.id)}>
      <h2>{project.title}</h2>
      <p>ID: {project.id}</p>
      <p>Chapters: {$chapters.filter(n => n.project == project.id).length}</p>
    </div>
  {/each}
</div>
{:else}
<div class="grid">
    <div class="new" on:click={()=> showCreateProject = true}>
        <span class="lnr lnr-plus-circle" /><br>
        Create your first Project!
    </div>
</div>
{/if}