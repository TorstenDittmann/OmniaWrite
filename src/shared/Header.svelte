<script>
  import { createEventDispatcher } from "svelte";
  import {link} from "svelte-spa-router";
  import active from 'svelte-spa-router/active'

  export let navigationState;

  const dispatch = createEventDispatcher();
</script>

<style>

</style>

<header>
  <nav class="header">
    <button
      class="burger"
      id="open-sidebar"
      on:click={() => dispatch('openSidebar')}>
      <i class="icon icon-menu" />
    </button>
    <a class="logo-mobile" href="#">
      <img src="assets/logo.png" alt="OmniaWrite Logo" />
    </a>
    <div id="navigation" class="navigation" class:active={navigationState}>
      <ul class="menu">
        <div class="backdrop" on:click={() => (navigationState = false)} />
        <a href="#" class="close" on:click={() => (navigationState = false)}>
          <i class="icon icon-close" />
        </a>
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
      <li class="tab active">
        <a href="#">Tab 1</a>
        <i class="icon icon-close" />
      </li>
      <li class="tab">
        <a href="#">Tab 2</a>
        <i class="icon icon-close" />
      </li>
    </ul>
  </div>
</header>
