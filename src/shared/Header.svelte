<script lang="javascript">
  import { createEventDispatcher } from "svelte";
  import { fade, fly } from "svelte/transition";
  import { link, location } from "svelte-spa-router";
  import { state, tabs } from "../stores";
  import { deskgap } from "../utils";
  import { _ } from "svelte-i18n";

  import active from "svelte-spa-router/active";

  export let navigationState;

  const isRunningElectron = deskgap.isRunning();

  const dispatch = createEventDispatcher();

  function createTab() {
    tabs.createTab($state.currentProject, $state.currentTitle, $location);
  }
</script>

<style type="text/css">
  .tab-action:hover {
    color: #4aaed9;
  }

  .titlebar {
    float: right;
    line-height: 4rem;
    font-size: 1.5rem;
    padding: 0 1rem;
    opacity: 0.65;
    cursor: pointer;
  }

  .titlebar:hover {
    opacity: 1;
  }
</style>

<header data-deskgap-drag>
  <nav class="header noselect">
    <button
      class="burger"
      id="open-sidebar"
      on:click={() => dispatch('openSidebar')}
      data-deskgap-no-drag>
      <span class="lnr lnr-menu" />
    </button>
    <a class="logo-mobile" href="/" use:link data-deskgap-no-drag>
      <img src="logo.png" alt="OmniaWrite Logo" />
    </a>
    {#if navigationState}
      <div
        id="navigation"
        class="navigation"
        class:active={navigationState}
        in:fly={{ y: 200, duration: 200 }}
        out:fly={{ y: 200, duration: 200 }}>
        <ul class="menu">
          <div
            class="backdrop"
            on:click={() => (navigationState = false)}
            data-deskgap-no-drag />
          <div
            class="close"
            on:click={() => (navigationState = false)}
            data-deskgap-no-drag>
            <span class="lnr lnr-cross" />
          </div>
          <li use:active={'/'} data-deskgap-no-drag>
            <a href="/" use:link>
              <img src="logo.png" alt="OmniaWrite Logo" />
            </a>
          </li>
          <li use:active={'/write/*'} data-deskgap-no-drag>
            <a href="/write/" use:link>{$_('header.write.title')}</a>
          </li>
          <li use:active={'/cards/'} data-deskgap-no-drag>
            <a href="/cards/" use:link>{$_('header.cards.title')}</a>
          </li>
          <!--<li use:active={'/mindmap/'}>
              <a href="/mindmap/" use:link>Mindmaps</a>
            </li>-->
          <li use:active={'/settings'} data-deskgap-no-drag>
            <a href="/settings" use:link>{$_('header.settings.title')}</a>
          </li>
          <li use:active={'/export'} data-deskgap-no-drag>
            <a href="/export" use:link>{$_('header.export.title')}</a>
          </li>
          <li use:active={'/cloud'} data-deskgap-no-drag>
            <a href="/cloud" use:link>{$_('header.cloud.title')}</a>
          </li>
        </ul>
        {#if isRunningElectron}
          <span
            class="lnr lnr-cross titlebar"
            on:click={deskgap.closeWindow}
            data-deskgap-no-drag />
          <span
            class="lnr lnr-chevron-down titlebar"
            on:click={deskgap.minimizeWindow}
            data-deskgap-no-drag />
        {/if}
      </div>
    {/if}
    <button
      class="mobile"
      id="open-navigation"
      on:click={() => (navigationState = true)}
      data-deskgap-no-drag>
      <span class="lnr lnr-book" />
    </button>
  </nav>
  <div class="tabs" data-deskgap-no-drag>
    <ul>
      {#each $tabs.filter(tabs => tabs.project == $state.currentProject) as tab}
        <li class="tab" use:active={tab.link}>
          <a href={tab.link} use:link>{tab.title}</a>
          <span
            class="lnr lnr-cross tab-action"
            on:click={() => tabs.removeTab(tab.id)} />
        </li>
      {/each}
      <li class="tab" on:click={createTab}>
        <span class="lnr lnr-plus-circle" />
      </li>
    </ul>
  </div>
</header>
