<script lang="javascript">
  import { state, projects, chapters, scenes, settings } from "../../stores";
  import { _ } from "svelte-i18n";

  let chapterCount = 0;
  let sceneCount = 0;
  let wordCount = 0;
  let charCount = 0;

  $: {
    chapterCount = 0;
    sceneCount = 0;
    wordCount = 0;
    charCount = 0;
    chapters.subscribe(chapters => {
      chapters
        .filter(chapter => chapter.project == $state.currentProject)
        .forEach(chapter => {
          chapterCount++;
          scenes.subscribe(scenes => {
            scenes
              .filter(scene => scene.chapter == chapter.id)
              .forEach(scene => {
                sceneCount++;
                if (scene.content) {
                  scene.content.blocks.forEach(block => {
                    if(block.data.text) {
                      wordCount += block.data.text.split(" ").length;
                      charCount += block.data.text.length;
                    }
                  });
                }
              });
          });
        });
    });
  }
</script>

<style type="text/css">
  .column {
    width: 20%;
    padding: 0 5px;
  }

  .row {
    display: flex;
    justify-content: center;
    margin: 0 -5px;
  }

  .row:after {
    content: "";
    display: table;
    clear: both;
  }

  @media screen and (max-width: 600px) {
    .column {
      width: 100%;
      display: block;
      margin-bottom: 1rem;
    }
  }
  .card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    padding: 1rem;
    text-align: center;
    background-color: var(--background-color);
    color: var(--text-color);
  }
  .card:hover {
    transform: scale(1.1);
  }
</style>

<div class="row">
  <div class="column">
    <div class="card">
      <h3>{chapterCount}</h3>
      <p>{$_("overview.project.chapters")}</p>
    </div>
  </div>

  <div class="column">
    <div class="card">
      <h3>{sceneCount}</h3>
      <p>{$_("overview.project.scenes")}</p>
    </div>
  </div>

  <div class="column">
    <div class="card">
      <h3>{wordCount}</h3>
      <p>{$_("overview.project.words")}</p>
    </div>
  </div>

  <div class="column">
    <div class="card">
      <h3>{charCount}</h3>
      <p>{$_("overview.project.characters")}</p>
    </div>
  </div>
</div>
