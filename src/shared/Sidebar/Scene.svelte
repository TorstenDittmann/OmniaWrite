<script>
  import { createEventDispatcher } from "svelte";
  import { _ } from "svelte-i18n";
  import { push } from "svelte-spa-router";
  import active from "svelte-spa-router/active";
  import tippy from "sveltejs-tippy";

  export let scene;

  const dispatch = createEventDispatcher();
  const edit = () => {
    dispatch("edit", scene);
  };
</script>

<li
  use:active={'/write/' + scene.id}
  on:click|self={() => push('/write/' + scene.id)}>
  <a href="#/write/{scene.id}">{scene.title}</a>
  <span
    class="lnr lnr-cog action"
    use:tippy={{ content: $_('sidebar.editScene'), placement: 'right' }}
    on:click={edit} />
</li>

<style lang="scss">
  @import "../../css/mixins/devices";

  li {
    padding: 0.5rem 0 0.5rem 2rem;

    a,
    span {
      text-decoration: none;
      opacity: 0.65;
    }

    .action {
      visibility: visible;
      float: right;
      margin-right: 1em;
      opacity: 0.65;

      @include desktop {
        visibility: hidden;
        &:hover {
          opacity: 1;
        }
      }
    }

    &:hover {
      background-color: var(--menu-hover);

      a {
        opacity: 1;
      }

      @include desktop {
        .action {
          visibility: visible;
        }
      }
    }
  }
  :global(li.active) {
    background-color: var(--menu-active);

    a {
      opacity: 1;
    }
  }
</style>
