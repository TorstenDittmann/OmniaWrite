<script>
    import {
        Workbox
    } from 'workbox-window';

    import Router from "svelte-spa-router";

    import {
        state,
        projects
    } from "./stores";

    import HeaderComponent from "./shared/Header.svelte";
    import SidebarComponent from "./shared/Sidebar.svelte";
    import Toast from './shared/Toast.svelte';
    import Modal from './shared/Modal.svelte';


    import OverviewRoute from "./routes/Overview.svelte";
    import WriteRoute from "./routes/Write.svelte";
    import CardsRoute from "./routes/Cards.svelte";
    import MindmapRoute from "./routes/Mindmap.svelte";
    import SettingsRoute from "./routes/Settings.svelte";
    import CloudRoute from "./routes/Cloud.svelte";
    import ExportRoute from "./routes/Export.svelte";
    import FeedbackRoute from "./routes/Feedback.svelte";

    import {
        addMessages,
        setInitialLocale
    } from 'svelte-i18n';

    import en from './en.json'
    import de from './de.json'

    addMessages('en', en);
    addMessages('de', de);

    setInitialLocale({
        fallback: 'en'
    });

    const routes = {
        "/": OverviewRoute,
        "/write/:sceneId?": WriteRoute,
        "/cards": CardsRoute,
        "/mindmap/:mapId?": MindmapRoute,
        "/settings": SettingsRoute,
        "/cloud": CloudRoute,
        "/export": ExportRoute,
        "/feedback": FeedbackRoute,

        // Catch-all
        "*": OverviewRoute
    };
    const wb = new Workbox('./service-worker.js');
    let updateAvailable = false;

    /**
     * Register Service Worker.
     */
    if ('serviceWorker' in navigator) {
        wb.addEventListener('waiting', (event) => {
            updateAvailable = true;
        });
        wb.register();
    }
    /**
     * Update app.
     */
    function updateApp() {
        wb.addEventListener('controlling', (event) => {
            window.location.reload();
        });
        wb.messageSW({
            type: 'SKIP_WAITING'
        });
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
     * Swipe detection.
     */
    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchmove', handleTouchMove, false);

    /**
     * Handle touch gestures.
     */

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
                if (sidebarState) {
                    sidebarState = false;
                } else {
                    navigationState = true;
                }
            } else {
                if (navigationState) {
                    navigationState = false;
                } else {
                    sidebarState = true;
                }
            }
        }
        xDown = null;
        yDown = null;
    };

    /**
     * 
     */
    window.doorbellOptions = {
        id: "11083",
        appKey: "L7mreXHsiGLMDgoDA4nAwKF6qVi47ZOCv0uXh1XT3IJmjFnsFBMl4tEBVqt9kx1m",
        properties: { // Optional, a Javascript object of custom properties you want to set
            Backendless: localStorage.getItem('Backendless') || "",
            state: localStorage.getItem('state') || ""
        },
    };
    (function (w, d, t) {
        var hasLoaded = false;

        function l() {
            if (hasLoaded) {
                return;
            }
            hasLoaded = true;
            window.doorbellOptions.windowLoaded = true;
            var g =
                d.createElement(t);
            g.id = 'doorbellScript';
            g.type = 'text/javascript';
            g.async = true;
            g.src =
                'https://embed.doorbell.io/button/' + window.doorbellOptions['id'] + '?t=' + (new Date().getTime());
            (d.getElementsByTagName('head')[0] || d.getElementsByTagName('body')[0]).appendChild(g);
        }
        if (w.attachEvent) {
            w.attachEvent('onload', l);
        } else if (w.addEventListener) {
            w.addEventListener('load', l,
                false);
        } else {
            l();
        }
        if (d.readyState == 'complete') {
            l();
        }
    }(window, document, 'script'));
</script>

<style>

</style>

<div class="container">
    <HeaderComponent bind:navigationState on:openSidebar={()=> (sidebarState = true)} />

        <SidebarComponent bind:sidebarState />
        <div id="content" class="content">
            <Toast bind:show={updateAvailable} text="New update installed!<br><i class='icon-cloud_download icon3x' />"
                on:click={updateApp} duration="forever" />
            <div class="inner">
                <Router {routes} />
            </div>
        </div>
</div>