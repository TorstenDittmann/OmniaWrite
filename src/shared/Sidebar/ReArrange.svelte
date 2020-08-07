<script>
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import { _ } from "svelte-i18n";
  import { chapters, scenes, state } from "../../stores";

  import Sortable, {
    AutoScroll,
  } from "sortablejs/modular/sortable.core.esm.js";

  import Modal from "../Modal.svelte";
  import { Input, ButtonGroup, Button } from "../../components/Forms";

  export let show;

  Sortable.mount(new AutoScroll());

  const sortableConfig = {
    animation: 150,
    fallbackOnBody: true,
    swapThreshold: 0.65,
  };

  onMount(() => {
    const chaptersRef = document.querySelector(".chapters");
    const sceneRefs = document.querySelectorAll(".scenes");

    Sortable.create(chaptersRef, {
      group: "chapters",
      ...sortableConfig,
    });
    sceneRefs.forEach((ref) => {
      Sortable.create(ref, {
        group: "scenes",
        ...sortableConfig,
      });
    });
  });
</script>

<style lang="scss">
  .chapters {
    padding: 0;
    margin: 0;
    line-height: 1.1;
    li {
      list-style-type: none;
      padding: 0;
      font-weight: bold;

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
        }
      }
    }
    [draggable] {
      -moz-user-select: none;
      -khtml-user-select: none;
      -webkit-user-select: none;
      user-select: none;
      -khtml-user-drag: element;
      -webkit-user-drag: element;
    }
  }
</style>

<Modal bind:show>
  <h2 slot="header">{$_('sidebar.modal.reArrange.header')}</h2>
  <ul class="chapters">
    {#each get(chapters)
      .filter((chapter) => chapter.project == $state.currentProject)
      .sort((a, b) => a.order - b.order) as chapter, i}
      <li class="parent" class:open={chapter.ui.open}>
        <span>{chapter.title}</span>
        <ul class="scenes">
          {#each get(scenes)
            .filter((scene) => scene.chapter == chapter.id)
            .sort((a, b) => a.order - b.order) as scene}
            <li>
              <span>{scene.title}</span>
            </li>
          {/each}
        </ul>
      </li>
    {/each}
  </ul>
</Modal>
