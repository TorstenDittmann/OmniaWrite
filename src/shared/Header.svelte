<script>
  import { createEventDispatcher } from "svelte";

  import { link, location } from "svelte-spa-router";
  import active from 'svelte-spa-router/active'

  import { state, tabs } from "../stores";


  export let navigationState;

  const dispatch = createEventDispatcher();

  function closeTab(argTabId) {
    tabs.set($tabs.filter(tab => tab.id != argTabId));
  }

  function createTab() {
    tabs.set($tabs.concat([{
        id: (Math.floor(Math.random() * 999) + 100),
        title: $state.currentTitle,
        project: $state.currentProject,
        link: $location
      }]));
    
  }
</script>

<style>

.tab-action:hover {
  color: #4aaed9;
}

</style>

<header>
  <nav class="header">
    <button
      class="burger"
      id="open-sidebar"
      on:click={() => dispatch('openSidebar')}>
      <i class="icon icon-menu" />
    </button>
    <a class="logo-mobile" href="/" use:link>
      <img src="assets/logo.png" alt="OmniaWrite Logo" />
    </a>
    <div id="navigation" class="navigation" class:active={navigationState}>
      <ul class="menu">
        <div class="backdrop" on:click={() => (navigationState = false)} />
        <div class="close" on:click={() => (navigationState = false)}>
          <i class="icon icon-close" />
        </div>
        <li use:active={'/', 'active'}>
          <a href="/" use:link>
            <img src="assets/logo.png" alt="OmniaWrite Logo" />
          </a>
        </li>
        <li use:active={'/write/*', 'active'}>
          <a href="/write/" use:link>Write</a>
        </li>
        <li use:active={'/database/*', 'active'}>
          <a href="/database/" use:link>Database</a>
        </li>
        <li use:active={'/mindmap/*', 'active'}>
          <a href="/mindmap/" use:link>Mindmaps</a>
        </li>
        <li use:active={'/settings', 'active'}>
          <a href="/settings" use:link>Settings</a>
        </li>
        <li use:active={'/export', 'active'}>
          <a href="/export" use:link>Export</a>
        </li>
      </ul>
    </div>
    <button
      class="mobile"
      id="open-navigation"
      on:click={() => (navigationState = true)}>
      <i class="icon icon-more-vert" />
    </button>
  </nav>
  <div class="tabs">
    <ul>
      {#each $tabs.filter(tabs => tabs.project == $state.currentProject) as tab}
      <li class="tab" use:active={tab.link, 'active'}>
        <a href={tab.link} use:link>{tab.title}</a>
        <i class="icon icon-close tab-action" on:click={() => closeTab(tab.id)} />
      </li>
      {/each}
      <li class="tab" on:click={createTab}>
        <i class="icon icon-arrow-up tab-action" />
      </li>
    </ul>
  </div>
</header>
