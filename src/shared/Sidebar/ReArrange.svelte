<script>
  import { onDestroy, onMount } from "svelte";
  import { get } from "svelte/store";
  import { _ } from "svelte-i18n";
  import { chapters, scenes, state } from "../../stores";

  import Sortable, {
    AutoScroll,
  } from "sortablejs/modular/sortable.core.esm.js";

  import Modal from "../Modal.svelte";
  import { ButtonGroup, Button } from "../../components/Forms";

  try {
    Sortable.mount(new AutoScroll());
  } catch (e) {
    console.info("Prevent duplicate mounting.")
  }

  export let show;

  let orderChapter;

  const sortableConfig = {
    animation: 150,
    delay: 500,
    delayOnTouchOnly: true,
    fallbackOnBody: true,
    swapThreshold: 0.65,
    scrollSpeed: 100,
    scrollSensitivity: 1000,
    bubbleScroll: true,
  };

  const save = () => {
    orderChapter
      .toArray()
      .map(chapter => {
        return {
          id: chapter,
          scenes: [
            ...document
              .querySelector(`[data-id="${chapter}"]`)
              .querySelectorAll("[data-id]"),
          ].map(scene => scene.dataset.id),
        };
      })
      .forEach((e, i) => {
        chapters.setChapterOrder(e.id, i);
        e.scenes.forEach((scene, p) => {
          scenes.setSceneOrder(scene, p);
          scenes.moveScene(scene, e.id);
        });
      });
    show = false;
  };

  onMount(() => {
    const chaptersRef = document.querySelector("#order.chapters");
    const sceneRefs = document.querySelectorAll("#order .scenes");

    orderChapter = Sortable.create(chaptersRef, {
      group: "chapters",
      ...sortableConfig,
    });
    sceneRefs.forEach(ref => {
      Sortable.create(ref, {
        group: "scenes",
        ...sortableConfig,
      });
    });
  });

  onDestroy(() => {
    [
      document.querySelector("#order.chapters"),
      ...document.querySelectorAll("#order .scenes"),
    ].forEach(ref => Sortable.get(ref).destroy());
  });
</script>

<Modal bind:show>
  <h2 slot="header">{$_('sidebar.editOrder')}</h2>
  <ul id="order" class="chapters">
    {#each get(chapters)
      .filter(chapter => chapter.project == $state.currentProject)
      .sort((a, b) => a.order - b.order) as chapter, i}
      <li class="parent" class:open={chapter.ui.open} data-id={chapter.id}>
        <span>{chapter.title}</span>
        <ul class="scenes">
          {#each get(scenes)
            .filter(scene => scene.chapter == chapter.id)
            .sort((a, b) => a.order - b.order) as scene}
            <li data-id={scene.id}><span>{scene.title}</span></li>
          {/each}
        </ul>
      </li>
    {/each}
  </ul>
  <ButtonGroup>
    <Button on:click={save}>Save</Button>
  </ButtonGroup>
</Modal>

<style lang="scss">
  .chapters {
    padding: 0;
    margin: 0;
    line-height: 1.1;
    li {
      list-style-type: none;
      padding: 0;
      font-weight: bold;
      -moz-user-select: none;
      -khtml-user-select: none;
      -webkit-user-select: none;
      user-select: none;
      -khtml-user-drag: element;
      -webkit-user-drag: element;

      span {
        opacity: 0.65;
        display: block;
        padding: 0.5rem;
        &:hover {
          background-color: var(--menu-hover);
          opacity: 1;
        }
      }
      .scenes {
        li {
          font-weight: normal;
          -moz-user-select: none;
          -khtml-user-select: none;
          -webkit-user-select: none;
          user-select: none;
          -khtml-user-drag: element;
          -webkit-user-drag: element;
        }
      }
    }
  }
</style>
