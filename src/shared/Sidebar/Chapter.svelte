<script>
  import { createEventDispatcher } from "svelte";
  import { _ } from "svelte-i18n";
  import { chapters, ui } from "../../stores";
  import tippy from "sveltejs-tippy";

  export let chapter;

  const dispatch = createEventDispatcher();

  const edit = () => {
    dispatch("edit", chapter);
  };
</script>

<style lang="scss">
  @import "../../css/mixins/devices";

  li {
    cursor: pointer;
    display: block;
    width: 100%;

    span {
      text-decoration: none;
      opacity: 0.65;
    }

    .key {
      display: block;
      padding: 1rem;
      font-weight: bold;

      .collapse {
        float: right;
        transform: rotate(-90deg);

        &:hover {
          opacity: 1;
        }
      }

      .action {
        visibility: visible;
        float: right;
        margin-right: 1em;
        opacity: 0.65;

        @include desktop {
          visibility: hidden;
        }

        &:hover {
          opacity: 1;
        }
      }

      &:hover {
        opacity: 1;
        background-color: var(--menu-hover);

        @include desktop {
          .action {
            visibility: visible;
          }
        }
      }
    }
    &.open {
      .key .collapse {
        transform: rotate(0deg);
      }
    }

    .scenes {
      list-style-type: none;
      padding: 0;
    }
  }
</style>

<li class:open={chapter.ui.open}>
  <span
    class="key"
    on:click|self={() => chapters.toggleChapterInSidebar(chapter.id)}>
    {chapter.title}
    <span
      class="lnr lnr-chevron-up collapse"
      on:click|self={() => chapters.toggleChapterInSidebar(chapter.id)} />
    <span
      class="lnr lnr-cog action"
      use:tippy={{ content: $_('sidebar.editChapter'), placement: 'right' }}
      on:click={edit} />
  </span>
  {#if chapter.ui.open}
    <ul class="scenes">
      <slot />
    </ul>
  {/if}
</li>
