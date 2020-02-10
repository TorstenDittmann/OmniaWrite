<script lang="javascript">
  import { createEventDispatcher, onMount } from "svelte";
  import { fade, fly } from "svelte/transition";
  import { link, location } from "svelte-spa-router";
  import { state, tabs } from "../stores";
  import { deskgap, isRunningElectron } from "../utils";
  import { _ } from "svelte-i18n";

  import active from "svelte-spa-router/active";

  import cloud from "../appwrite";
  import Toast from "../shared/Toast.svelte";
  import Spinner from "../shared/Spinner.svelte";

  export let navigationState;

  const dispatch = createEventDispatcher();

  let isValidLogin = $state.isUserLoggedIn;
  let showCloudUpload = false;
  let isCloudUploading = false;
  let showCloudToast = false;

  $: {
    if (isValidLogin) {
      if ($state.lastCloudSave < $state.lastLocalSave) {
        showCloudUpload = true;
      } else {
        showCloudUpload = false;
      }
    }
  }

  function createTab() {
    tabs.createTab($state.currentProject, $state.currentTitle, $location);
  }

  function syncCloud() {
    showCloudUpload = false;
    isCloudUploading = true;
    cloud.saveToCloud().then(response => {
      isCloudUploading = false;
      showCloudToast = true;
    });
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
    color: var(--menu-link);
  }

  .titlebar:hover {
    opacity: 1;
  }

  .tab.new {
    cursor: pointer;
  }
</style>

<header style="-webkit-app-region: drag">
  <nav class="header noselect">
    <button
      class="burger"
      id="open-sidebar"
      on:click={() => dispatch('openSidebar')}
      style="-webkit-app-region: no-drag">
      <span class="lnr lnr-menu" />
    </button>
    <a
      class="logo-mobile"
      href="/"
      use:link
      style="-webkit-app-region: no-drag">
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
            style="-webkit-app-region: no-drag" />
          <div
            class="close"
            on:click={() => (navigationState = false)}
            style="-webkit-app-region: no-drag">
            <span class="lnr lnr-cross" />
          </div>
          <li use:active={'/'} style="-webkit-app-region: no-drag">
            <a href="/" use:link>
              <img src="logo.png" alt="OmniaWrite Logo" />
            </a>
          </li>
          <li use:active={'/write/*'} style="-webkit-app-region: no-drag">
            <a href="/write/" use:link>{$_('header.write.title')}</a>
          </li>
          <li use:active={'/cards/'} style="-webkit-app-region: no-drag">
            <a href="/cards/" use:link>{$_('header.cards.title')}</a>
          </li>
          <li use:active={'/settings'} style="-webkit-app-region: no-drag">
            <a href="/settings" use:link>{$_('header.settings.title')}</a>
          </li>
          <li use:active={'/export'} style="-webkit-app-region: no-drag">
            <a href="/export" use:link>{$_('header.export.title')}</a>
          </li>
          <li use:active={'/cloud'} style="-webkit-app-region: no-drag">
            <a href="/cloud" use:link>{$_('header.cloud.title')}</a>
          </li>
          {#if isValidLogin}
            {#if showCloudUpload}
              <li on:click={syncCloud} style="-webkit-app-region: no-drag">
                <span class="lnr lnr-cloud-upload" />
              </li>
            {:else}
              <li>
                <span class="lnr lnr-cloud-check" />
              </li>
            {/if}
            {#if isCloudUploading}
              <li>
                <Spinner />
              </li>
            {/if}
          {/if}
        </ul>
        {#if isRunningElectron}
          <span
            class="lnr lnr-cross titlebar"
            on:click={deskgap.closeWindow}
            style="-webkit-app-region: no-drag" />
          <span
            class="lnr lnr-frame-expand titlebar"
            on:click={deskgap.resizeWindow}
            style="-webkit-app-region: no-drag" />
          <span
            class="lnr lnr-chevron-down titlebar"
            on:click={deskgap.minimizeWindow}
            style="-webkit-app-region: no-drag" />
        {/if}
      </div>
    {/if}
    <button
      class="mobile"
      id="open-navigation"
      on:click={() => (navigationState = true)}
      style="-webkit-app-region: no-drag">
      <span class="lnr lnr-book" />
    </button>
  </nav>
  <div class="tabs" style="-webkit-app-region: no-drag">
    <ul>
      {#each $tabs.filter(tabs => tabs.project == $state.currentProject) as tab}
        <li class="tab" use:active={tab.link}>
          <a href={tab.link} use:link>{tab.title}</a>
          <span
            class="lnr lnr-cross tab-action"
            on:click={() => tabs.removeTab(tab.id)} />
        </li>
      {/each}
      {#if $location != '/write/' && $location.includes('write')}
        <li class="tab new" on:click={createTab}>
          <span class="lnr lnr-plus-circle" />
        </li>
      {/if}
    </ul>
  </div>
</header>
<Toast
  bind:show={showCloudToast}
  text={$_('cloud.toast.savedCloud')}
  on:click={() => (showCloudToast = false)} />
