<script lang="javascript">
  import { Workbox } from "workbox-window";
  import { state, projects, settings, intern } from "./stores";
  import { deskgap, isRunningElectron } from "./utils";
  import cloud from "./appwrite";
  import { isLoading, locale, _ } from "svelte-i18n";

  import Router from "svelte-spa-router";
  import * as Sentry from "@sentry/browser";

  import HeaderComponent from "./shared/Header.svelte";
  import SidebarComponent from "./shared/Sidebar.svelte";
  import Toast from "./shared/Toast.svelte";
  import Modal from "./shared/Modal.svelte";
  import Install from "./shared/Install.svelte";
  import Support from "./shared/Support.svelte";

  import OverviewRoute from "./routes/Overview.svelte";
  import WriteRoute from "./routes/Write.svelte";
  import CardsRoute from "./routes/Cards.svelte";
  import SettingsRoute from "./routes/Settings.svelte";
  import CloudRoute from "./routes/Cloud.svelte";
  import ExportRoute from "./routes/Export.svelte";
  import ThirdPartyRoute from "./shared/ThirdParty.svelte";
  import DisclaimerRoute from "./shared/Disclaimer.svelte";
  import PolicyRoute from "./routes/Cloud/Policy.svelte";
  import Spinner from "./shared/Spinner.svelte";

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

    // Non header route
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

  /**
   * Register Service Worker.
   */
  if (
    "serviceWorker" in navigator &&
    !window.hasOwnProperty("cordova") &&
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
  function updateApp() {
    wb.addEventListener("controlling", (event) => {
      deskgap.reload();
    });
    wb.messageSW({
      type: "SKIP_WAITING",
    });
  }

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

  function routeLoaded(event) {
    if (mql.matches) {
      sidebarState = false;
      navigationState = false;
    }
  }

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

  /**
   * Check for newer backup
   */
  const checkForBackup = () => {
    cloud.getLatestBackup().then((response) => {
      if (response.files.length > 0) {
        if ($state.lastCloudSave < response.files[0].dateCreated) {
          // TODO: Implement checking for new Cloud Backup
          console.log("newer data on cloud");
        }
      }
    });
  };
  // checkForBackup();
  // setInterval(checkForBackup, 60000);

  /**
   * Listen for settings
   */
  $: {
    document.body.className = $settings.theme;
    locale.set($settings.language);
    document.body.style.setProperty(
      "--editor-font-size",
      $settings.fontsize + "rem"
    );
  }
</script>

{#if $isLoading}
  <Spinner />
{:else}
  <div class="container">
    <Support />
    {#if !$intern.installed}
      <Install />
    {/if}
    <HeaderComponent
      bind:navigationState
      on:openSidebar={() => (sidebarState = true)} />

    <SidebarComponent bind:sidebarState />
    <div id="content" class="content">
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
