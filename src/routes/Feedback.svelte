<script>
    import {
        onMount
    } from 'svelte';
    /**
     * Set Doorbell API options.
     */
    onMount(() => {
        window.doorbellOptions = {
            id: 11083,
            appKey: "L7mreXHsiGLMDgoDA4nAwKF6qVi47ZOCv0uXh1XT3IJmjFnsFBMl4tEBVqt9kx1m",
            container: document.getElementById('feedback'),
            hideButton: true,
            properties: { // Optional, a Javascript object of custom properties you want to set
                Backendless: localStorage.getItem('Backendless'),
                state: localStorage.getItem('state')
            },
            onHide: function () {},
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
                    'https://embed.doorbell.io/button/' + window.doorbellOptions['id'] + '?t=' + (
                        new Date().getTime());
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
    });
</script>

<div id="feedback"></div>