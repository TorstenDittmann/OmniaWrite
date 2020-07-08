<script>
  import { state, chapters, scenes, settings } from "../../stores";
  import { push } from "svelte-spa-router";
  import { _ } from "svelte-i18n";
  import { Grid, GridElement } from "../../components/Grid";

  import moment from "moment";
  import "moment/locale/de";

  moment.locale($settings.language);

  let sceneData = [];

  $: {
    sceneData = [];
    $chapters
      .filter((chapter) => chapter.project == $state.currentProject)
      .forEach((chapter) => {
        $scenes
          .filter((scene) => scene.chapter == chapter.id)
          .forEach((scene) => {
            sceneData.push(scene);
          });
      });
    sceneData = sceneData
      .sort((b, a) => {
        if (a.lastEdit < b.lastEdit) {
          return -1;
        }
        if (a.lastEdit > b.lastEdit) {
          return 1;
        }
        return 0;
      })
      .slice(0, 10);
  }
</script>

<Grid>
  {#each sceneData as scene}
    <GridElement on:click={() => push('/write/' + scene.id)}>
      <h2>{scene.title}</h2>
      <small>
        {$_('write.overview.opened')} {moment(scene.lastEdit, 'X').fromNow()}
      </small>
    </GridElement>
  {/each}
</Grid>
