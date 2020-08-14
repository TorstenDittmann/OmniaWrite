<script>
  import { get } from "svelte/store";
  import { _ } from "svelte-i18n";

  import { state, chapters, scenes } from "../../stores";
  import { countChars, countWords } from "../../utils";
  import Grid from "../../components/Grid/Grid.svelte";
  import GridElement from "../../components/Grid/GridElement.svelte";
  import Spinner from "../../shared/Spinner.svelte";

  const analyze = new Promise((resolve) => {
    const filteredChapters = get(chapters).filter(
      (e) => e.project == $state.currentProject
    );
    const filteredScenes = filteredChapters.flatMap((e) =>
      get(scenes).filter((s) => s.chapter == e.id)
    );
    const filteredRest = filteredScenes
      .flatMap((e) => (e.content && e.content.blocks ? e.content.blocks : []))
      .reduce(
        (prev, curr) => {
          return {
            words: prev.words + countWords(curr.data.text),
            chars: prev.chars + countChars(curr.data.text),
          };
        },
        { words: 0, chars: 0 }
      );

    resolve({
      chapters: filteredChapters.length,
      scenes: filteredScenes.length,
      words: filteredRest.words,
      chars: filteredRest.chars,
    });
  });
</script>

{#await analyze}
  <Spinner />
{:then analytics}
  <Grid columns={4}>
    <GridElement>
      <h3>{analytics.chapters}</h3>
      <p>{$_('overview.project.chapters')}</p>
    </GridElement>
    <GridElement>
      <h3>{analytics.scenes}</h3>
      <p>{$_('overview.project.scenes')}</p>
    </GridElement>
    <GridElement>
      <h3>{analytics.words}</h3>
      <p>{$_('overview.project.words')}</p>
    </GridElement>
    <GridElement>
      <h3>{analytics.chars}</h3>
      <p>{$_('overview.project.characters')}</p>
    </GridElement>
  </Grid>
{/await}
