<script>
  import {
    createEventDispatcher
  } from "svelte";

  import {
    fade,
    fly
  } from 'svelte/transition';

  import {
    link,
    location
  } from "svelte-spa-router";

  import active from 'svelte-spa-router/active';

  import {
    state,
    tabs
  } from "../stores";

  import {
    _
  } from 'svelte-i18n';

  // uncomment for electron
  /*  import * as path from 'path';
    import {
      remote,
      ipcRenderer
    } from 'electron';*/

  export let navigationState;

  const dispatch = createEventDispatcher();

  let userAgent = navigator.userAgent.toLowerCase();
  let isRunningElectron = false;
  if (userAgent.indexOf(' electron/') > -1) {
    isRunningElectron = true;
  }

  function closeWindow() {
    remote.BrowserWindow.getFocusedWindow().close();
  }

  function maximizeWindow() {
    if (remote.BrowserWindow.getFocusedWindow().isMaximized()) {
      remote.BrowserWindow.getFocusedWindow().restore();
    } else {
      remote.BrowserWindow.getFocusedWindow().maximize();
    }
  }

  function minimizeWindow() {
    remote.BrowserWindow.getFocusedWindow().minimize();

  }

  function createTab() {
    tabs.createTab(
      $state.currentProject,
      $state.currentTitle,
      $location);
  }
</script>

<style>
  .tab-action:hover {
    color: #4aaed9;
  }

  .titlebar {
    float: right;
    line-height: 4rem;
    font-size: 1.5rem;
    padding: 0 1rem;
    opacity: .65;
    -webkit-app-region: no-drag;
  }

  .titlebar:hover {
    opacity: 1;
  }

  header {
    -webkit-app-region: drag;
  }

  .menu li {
    -webkit-app-region: no-drag;
  }
</style>

<header>
  <nav class="header">
    <button class="burger" id="open-sidebar" on:click={()=> dispatch('openSidebar')}>
      <i class="icon-reorder" />
    </button>
    <a class="logo-mobile" href="/" use:link>
      <img src="assets/logo.png" alt="OmniaWrite Logo" />
    </a>
    {#if navigationState}
      <div id="navigation" class="navigation" class:active={navigationState} in:fly="{{ y: 200, duration: 200 }}" out:fly="{{ y: 200, duration: 200 }}">
        <ul class="menu">
          <div class="backdrop" on:click={()=> (navigationState = false)} />
            <div class="close" on:click={()=> (navigationState = false)}>
              <i class="icon-cross_mark" />
            </div>
            <li use:active={'/'}>
              <a href="/" use:link>
                <img src="assets/logo.png" alt="OmniaWrite Logo" />
              </a>
            </li>
            <li use:active={'/write/*'}>
              <a href="/write/" use:link>{$_('header.write.title')}</a>
            </li>
            <li use:active={'/cards/'}>
              <a href="/cards/" use:link>{$_('header.cards.title')}</a>
            </li>
            <!--<li use:active={'/mindmap/'}>
              <a href="/mindmap/" use:link>Mindmaps</a>
            </li>-->
            <li use:active={'/settings'}>
              <a href="/settings" use:link>{$_('header.settings.title')}</a>
            </li>
            <li use:active={'/export'}>
              <a href="/export" use:link>{$_('header.export.title')}</a>
            </li>
            <li use:active={'/cloud'}>
              <a href="/cloud" use:link>{$_('header.cloud.title')}</a>
            </li>
        </ul>
        {#if isRunningElectron}
        <i class="icon-cross_mark titlebar" on:click={closeWindow} />
        <i class="icon-chevron_up titlebar" on:click={maximizeWindow} />
        <i class="icon-chevron_down titlebar" on:click={minimizeWindow} />
        {/if}
      </div>
    {/if}
    <button class="mobile" id="open-navigation" on:click={()=> (navigationState = true)}>
      <i class="icon-reorder_square" />
    </button>
  </nav>
  <div class="tabs">
    <ul>
      {#each $tabs.filter(tabs => tabs.project == $state.currentProject) as tab}
      <li class="tab" use:active={tab.link}>
        <a href={tab.link} use:link>{tab.title}</a>
        <i 
        class="icon-cross_mark tab-action" 
        on:click={() => tabs.removeTab(tab.id)} />
      </li>
      {/each}
      <li class="tab" on:click={createTab}>
        <i class="icon-reply tab-action" />
      </li>
    </ul>
  </div>
</header>