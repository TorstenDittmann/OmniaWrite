<script>
    import {
        fade,
        fly
    } from 'svelte/transition';

    import {
        createEventDispatcher
    } from 'svelte';
    const dispatch = createEventDispatcher();

    export let show = false;
    export let type = "info";
    export let icon = "icon-heart";
    export let text = "A notification message..";
    export let duration = 5000;

    $: {
        if (show && duration != "forever") {
            setTimeout(() => {
                    show = false;
                },
                duration)
        }
    }
</script>
<style>
    div {
        cursor: pointer;
        opacity: .65;
    }

    div:hover {
        opacity: 1;
    }
</style>
{#if show}
<div on:click={() => {dispatch("click")}} id="snackbar" in:fly="{{ y: -100, duration: 500 }}" out:fly="{{ x: 100, duration: 500 }}">
    {@html text}
    <slot></slot>
</div>
{/if}