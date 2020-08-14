<script>
  import { onMount } from "svelte";
  import { isLoading, locale, _ } from "svelte-i18n";
  import Router, { location, replace } from "svelte-spa-router";

  import { Workbox } from "workbox-window";
  import {
    reloadWindow,
    isRunningElectron,
    isRunningCapacitor,
  } from "./bridge";
  import { state, projects, settings, intern, ui } from "./stores";
  import cloud from "./appwrite";

  import * as Sentry from "@sentry/browser";

  import HeaderComponent from "./shared/Header.svelte";
  import SidebarComponent from "./shared/Sidebar.svelte";
  import Toast from "./shared/Toast.svelte";
  import Modal from "./shared/Modal.svelte";
  import Install from "./shared/Install.svelte";
  import Support from "./shared/Support.svelte";
  import Spinner from "./shared/Spinner.svelte";
  import NewBackup from "./shared/NewBackup.svelte";
  import NewUpdate from "./shared/NewUpdate.svelte";

  import OverviewRoute from "./routes/Overview.svelte";
  import WriteRoute from "./routes/Write.svelte";
  import CardsRoute from "./routes/Cards.svelte";
  import SettingsRoute from "./routes/Settings.svelte";
  import CloudRoute from "./routes/Cloud.svelte";
  import ExportRoute from "./routes/Export.svelte";
  import ThirdPartyRoute from "./shared/ThirdParty.svelte";
  import DisclaimerRoute from "./shared/Disclaimer.svelte";
  import PolicyRoute from "./routes/Cloud/Policy.svelte";

  locale.set($settings.language);

  export let version;
  console.log(`Version: ${version}`);

  const routes = {
    "/": OverviewRoute,
    "/write/:sceneId?": WriteRoute,
    "/cards": CardsRoute,
    "/settings": SettingsRoute,
    "/cloud/": CloudRoute,
    "/cloud/*": CloudRoute,
    "/export": ExportRoute,

    // Non header routes
    "/thirdparty": ThirdPartyRoute,
    "/policy": PolicyRoute,
    "/disclaimer": DisclaimerRoute,

    // Catch-all
    "*": OverviewRoute,
  };

  Sentry.init({
    dsn: "https://23916d0950d744b49ded80f0177467a5@sentry.io/2319182",
  });

  const wb = new Workbox("./service-worker.js");
  let updateAvailable = false;
  let showChangelog = false;

  /**
   * Register Service Worker.
   */
  if (
    "serviceWorker" in navigator &&
    !isRunningCapacitor &&
    !isRunningElectron &&
    window.location.hostname !== "localhost"
  ) {
    wb.addEventListener("waiting", (event) => {
      updateAvailable = true;
    });
    wb.register();
  }

  /**
   * Update app.
   */
  const updateApp = () => {
    wb.addEventListener("controlling", (event) => {
      reloadWindow();
    });
    wb.messageSW({
      type: "SKIP_WAITING",
    });
  };

  /**
   * Defines state of sidebar and navigation based on max-width.
   */
  let mql = window.matchMedia("(max-width: 959px)");
  let sidebarState = mql.matches ? false : true;
  let navigationState = mql.matches ? false : true;
  mql.addListener((e) => {
    e.matches ? (navigationState = false) : (navigationState = true);
    e.matches ? (sidebarState = false) : (sidebarState = true);
  });

  const routeLoaded = (event) => {
    if (mql.matches) {
      sidebarState = false;
      navigationState = false;
    }
  };

  /**
   * Check for login
   */
  cloud.isUserLoggedIn().then(
    (user) => {
      if (user["$id"]) {
        state.setLogin(true);
      } else {
        state.setLogin(false);
      }
    },
    (err) => {
      state.setLogin(false);
    }
  );

  onMount(() => {
    if ($settings.lastLocation) {
      if ($state.lastLocation) {
        replace($state.lastLocation);
      }
    }
    if (version !== $intern.version) {
      showChangelog = true;
      $intern.version = version;
    }
    location.subscribe((currentLocation) => {
      state.setCurrentLocation(currentLocation);
    });
  });

  /**
   * Listen for settings
   */
  $: {
    document.body.className = $settings.theme;
    locale.set($settings.language);
    document.body.style.setProperty(
      "--editor-font-size",
      ($settings.fontsize === undefined ? 1 : $settings.fontsize) + "rem"
    );
  }
</script>

<style lang="scss">
  @import "css/mixins/devices";

  .loading {
    width: 100vw;

    > .spinner {
      text-align: center;
      margin: 45vh 0;
    }
  }

  .container {
    height: 100vh;
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: 6rem auto;
    grid-template-areas: "header" "content";

    @include desktop {
      grid-template-columns: 300px auto;
      grid-template-areas: "header header" "sidebar content";
    }

    .content {
      grid-area: content;
      overflow: auto;
      scrollbar-color: rgb(13, 19, 22) rgb(25, 38, 44);
      height: 90vh;

      .inner {
        padding: 1rem;
        text-align: center;

        @include desktop {
          text-align: initial;
        }
      }

      &.focus {
        position: fixed;
        width: 100vw;
        height: 100vh;
        left: 0;
        top: 0;
        background: var(--background-color);
        z-index: 99;
      }
    }
  }
</style>

{#if $isLoading}
  <div class="loading">
    <div class="spinner">
      <Spinner />
    </div>
  </div>
{:else}
  <div class="container">
    <Support />
    <NewUpdate bind:show={showChangelog} />
    {#if $state.isUserLoggedIn}
      <NewBackup />
    {/if}
    {#if !$intern.installed}
      <Install />
    {/if}
    <HeaderComponent
      bind:navigationState
      on:openSidebar={() => (sidebarState = true)} />
    <SidebarComponent bind:sidebarState />
    <div class="content" class:focus={$ui.focus}>
      <Toast
        bind:show={updateAvailable}
        text={$_('common.update-toast')}
        on:click={updateApp}
        duration="forever" />
      <div class="inner">
        <Router {routes} on:routeLoaded={routeLoaded} />
      </div>
    </div>
  </div>
{/if}
