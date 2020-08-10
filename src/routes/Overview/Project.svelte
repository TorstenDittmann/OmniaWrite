<script>
  import { state, projects, chapters, scenes, settings } from "../../stores";
  import { countChars, countWords } from "../../utils";
  import { _ } from "svelte-i18n";
  import Grid from "../../components/Grid/Grid.svelte";
  import GridElement from "../../components/Grid/GridElement.svelte";

  let chapterCount = 0;
  let sceneCount = 0;
  let wordCount = 0;
  let charCount = 0;

  // TODO: this causes memory leaks and performance suffers

  $: {
    chapterCount = 0;
    sceneCount = 0;
    wordCount = 0;
    charCount = 0;
    chapters.subscribe((chapters) => {
      chapters
        .filter((chapter) => chapter.project == $state.currentProject)
        .forEach((chapter) => {
          chapterCount++;
          scenes.subscribe((scenes) => {
            scenes
              .filter((scene) => scene.chapter == chapter.id)
              .forEach((scene) => {
                sceneCount++;
                if (scene.content) {
                  scene.content.blocks.forEach((block) => {
                    if (block.data.text) {
                      wordCount += countWords(block.data.text);
                      charCount += countChars(block.data.text);
                    }
                  });
                }
              });
          });
        });
    });
  }
</script>

<Grid columns={4}>
  <GridElement>
    <h3>{chapterCount}</h3>
    <p>{$_('overview.project.chapters')}</p>
  </GridElement>
  <GridElement>
    <h3>{sceneCount}</h3>
    <p>{$_('overview.project.scenes')}</p>
  </GridElement>
  <GridElement>
    <h3>{wordCount}</h3>
    <p>{$_('overview.project.words')}</p>
  </GridElement>
  <GridElement>
    <h3>{charCount}</h3>
    <p>{$_('overview.project.characters')}</p>
  </GridElement>
</Grid>
