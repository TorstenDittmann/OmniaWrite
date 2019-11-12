<script>
    import {
        fade,
        fly
    } from 'svelte/transition';

    export let show = false;
    export let type = "info";
    export let icon = "icon-heart";
    export let text = "A notification message..";
    export let duration = 5000;

    $: {
        if (show) {
            setTimeout(() => {
                    show = false;
                },
                duration)
        }
    }
</script>
{#if show}
<div id="snackbar" in:fly="{{ y: -100, duration: 500 }}" out:fly="{{ y: -100, duration: 500 }}">
    {text}
</div>
{/if}