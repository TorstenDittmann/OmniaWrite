<script>
  import { get } from "svelte/store";
  import { link, location } from "svelte-spa-router";
  import active from "svelte-spa-router/active";

  import { state, tabs, scenes } from "../../stores";

  const createTab = () => {
    tabs.createTab($state.currentProject, $location);
  };

  const getTitle = location => {
    const [type, id] = location.split("/").filter(String);
    switch (type) {
      case "write":
        return get(scenes).find(s => s.id == id).title;

      default:
        return "-";
    }
  };
</script>

<div class="tabs" style="-webkit-app-region: no-drag">
  <ul>
    {#each $tabs.filter(tabs => tabs.project == $state.currentProject) as tab}
      <li class="tab" use:active={tab.link}>
        <a href={tab.link} use:link>{getTitle(tab.link)}</a>
        <span
          class="lnr lnr-cross tab-action"
          on:click={() => tabs.removeTab(tab.id)} />
      </li>
    {/each}
    {#if $location != '/write/' && $location.includes('write') && !$tabs.some(tab => tab.link == $location)}
      <li class="tab new" on:click={createTab}>
        <span class="lnr lnr-plus-circle" />
      </li>
    {/if}
  </ul>
</div>

<style lang="scss">
  .tabs {
    background-color: var(--secondary-color);
    box-shadow: 0 -1px 0 #495865 inset;
    text-align: left;
    width: 100vw;

    ul {
      list-style-type: none;
      overflow-x: auto;
      scrollbar-width: none;
      overflow-y: hidden;
      height: 2rem;
      margin: 0;
      padding: 0;
      list-style-position: inside;
      white-space: nowrap;

      .tab {
        font-size: 0.9rem;
        line-height: 2rem;
        margin-right: 0.5rem;
        display: inline-block;
        opacity: 0.65;
        height: 32px;

        a {
          padding: 0 0.5rem;
          text-decoration: none;
        }

        span {
          margin-bottom: 3px;
          font-size: 1rem;
        }

        .tab-action:hover {
          color: #4aaed9;
        }

        .new {
          cursor: pointer;
        }

        &:hover {
          box-shadow: 0 -3px 0 #4aaed9 inset;
          transition: box-shadow 0.2s ease-in;
        }
      }
    }

    & ul::-webkit-scrollbar {
      width: 0rem;
      height: 0rem;
    }
  }
  :global(.tab.active) {
    opacity: 1;
    box-shadow: 0 -3px 0 #4aaed9 inset;
    transition: box-shadow 0.2s ease-in;
    background: none;
  }
</style>
