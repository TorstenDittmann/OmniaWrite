<script>
    import {
        state,
        chapters,
        scenes
    } from "../../stores";

    $: projectData = $chapters.filter(chapter => chapter.project == $state.currentProject);
</script>

<style>

</style>
<h1>Write</h1>