<script>
    import Router from "svelte-spa-router";

    import {
        state,
        projects
    } from "./stores";

    import HeaderComponent from "./shared/Header.svelte";
    import SidebarComponent from "./shared/Sidebar.svelte";
    import Toast from './shared/Toast.svelte';


    import OverviewRoute from "./routes/Overview.svelte";
    import WriteRoute from "./routes/Write.svelte";
    import CardsRoute from "./routes/Cards.svelte";
    import MindmapRoute from "./routes/Mindmap.svelte";
    import SettingsRoute from "./routes/Settings.svelte";
    import CloudRoute from "./routes/Cloud.svelte";
    import ExportRoute from "./routes/Export.svelte";

    const routes = {
        "/": OverviewRoute,
        "/write/:sceneId?": WriteRoute,
        "/cards": CardsRoute,
        "/mindmap/:mapId?": MindmapRoute,
        "/settings": SettingsRoute,
        "/cloud": CloudRoute,
        "/export": ExportRoute,

        // Catch-all
        "*": OverviewRoute
    };

    let updateAvailable = false;
    if ("serviceWorker" in navigator && location.hostname != "localhost") {
        navigator.serviceWorker.register('/service-worker.js')
            .then(reg => {
                reg.onupdatefound = () => {
                    const installingWorker = reg.installing;
                    installingWorker.onstatechange = () => {
                        switch (installingWorker.state) {
                            case 'installed':
                                if (navigator.serviceWorker.controller) {
                                    // new update available
                                    updateAvailable = true;
                                }
                                break;
                        }
                    };
                };
            })
            .catch(err => console.error('[SW ERROR]', err));
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
            <Toast bind:show={updateAvailable} text="Update available!<br><br> Click here to reload." on:click={()=>
                {window.location.reload()}}
                duration="forever" />
                <div class="inner">
                    <Router {routes} />
                </div>
        </div>
</div>