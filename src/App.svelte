<script>
    import {
        register
    } from 'register-service-worker'

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
    // register service worker
    register('/service-worker.js', {
        registrationOptions: {
            scope: './'
        },
        ready(registration) {
            console.log('Service worker is active.')
        },
        registered(registration) {
            console.log('Service worker has been registered.')
        },
        cached(registration) {
            console.log('Content has been cached for offline use.')
        },
        updatefound(registration) {
            console.log('New content is downloading.')
        },
        updated(registration) {
            console.log('New content is available; please refresh.')
            updateAvailable = true;
        },
        offline() {
            console.log('No internet connection found. App is running in offline mode.')
        },
        error(error) {
            console.error('Error during service worker registration:', error)
        }
    });

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
            <Toast bind:show={updateAvailable}
                text="Reload app for new update!<br><i class='icon-cloud_download icon3x' />" on:click={()=>
                {window.location.reload()}}
                duration="forever" />
                <div class="inner">
                    <Router {routes} />
                </div>
        </div>
</div>