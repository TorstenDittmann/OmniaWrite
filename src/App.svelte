<script>
  import Router from "svelte-spa-router";

  import {
    state,
    projects
  } from "./stores";

  import HeaderComponent from "./shared/Header.svelte";
  import SidebarComponent from "./shared/Sidebar.svelte";

  import OverviewRoute from "./routes/Overview.svelte";
  import WriteRoute from "./routes/Write.svelte";
  import DatabaseRoute from "./routes/Database.svelte";
  import MindmapRoute from "./routes/Mindmap.svelte";
  import SettingsRoute from "./routes/Settings.svelte";
  import ExportRoute from "./routes/Export.svelte";

  const routes = {
    "/": OverviewRoute,
    "/write/:sceneId?": WriteRoute,
    "/database/:entryId?": DatabaseRoute,
    "/mindmap/:mapId?": MindmapRoute,
    "/settings": SettingsRoute,
    "/export": ExportRoute,

    // Catch-all
    "*": OverviewRoute
  };

  if ("serviceWorker" in navigator && location.hostname != "localhost") {
    navigator.serviceWorker.register("/service-worker.js");
  }

  /**
   * Defines state of sidebar and navigation based on max-width.
   */
  let mql = window.matchMedia('(max-width: 960px)');
  let sidebarState = mql.matches ? false : true;
  let navigationState = mql.matches ? false : true;
  mql.addListener((e) => e.matches ? sidebarState = false : sidebarState = true);
  mql.addListener((e) => e.matches ? navigationState = false : navigationState = true);

  /**
   * Swipe detection
   */
  document.addEventListener('touchstart', handleTouchStart, false);
  document.addEventListener('touchmove', handleTouchMove, false);

  let xDown = null;
  let yDown = null;

  function handleTouchStart(evt) {
    xDown = evt.touches[0].clientX;
    yDown = evt.touches[0].clientY;
  };

  function handleTouchMove(evt) {
    if (!xDown || !yDown) {
      return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) {
        sidebarState = false;
      } else {
        sidebarState = true;
      }
    }
    xDown = null;
    yDown = null;
  };
</script>

<style>

</style>

<div class="container">
  <HeaderComponent bind:navigationState on:openSidebar={()=> (sidebarState = true)} />

    <SidebarComponent bind:sidebarState />
    <div id="content" class="content">
      <div class="inner">
        <Router {routes} />
      </div>
    </div>
</div>