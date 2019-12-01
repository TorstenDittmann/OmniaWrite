<script>
    import {
        state,
        chapters,
        scenes,
        settings
    } from "../../stores";

    import {
        push
    } from "svelte-spa-router";

    import {
        _
    } from 'svelte-i18n';

    import moment from 'moment';
    import 'moment/locale/de';

    let sceneData = [];

    moment.locale($settings.language);

    $: {
        const unsubscribe = $chapters.filter(chapter => chapter.project == $state.currentProject).forEach(
            chapter => {
                $scenes.filter(scene => scene.chapter == chapter.id).forEach(scene => {
                    sceneData.push(scene);
                });
            });
        sceneData = sceneData.sort((b, a) => {
            if (a.lastEdit < b.lastEdit) {
                return -1;
            }
            if (a.lastEdit > b.lastEdit) {
                return 1;
            }
            return 0;
        }).slice(0, 4);
    }
</script>

<style>

</style>
<h1>Write</h1>
Here will be an overview of scenes ordered by the last edit.
<h1>last edited</h1>
<div id="cards" class="grid">
    {#each sceneData as scene}
    <div id="card" on:click={()=> push('/write/' + scene.id)}>
        <h2>{scene.title}</h2>
        <small>{moment(scene.lastEdit, "X").fromNow()}</small>
    </div>
    {/each}
</div>