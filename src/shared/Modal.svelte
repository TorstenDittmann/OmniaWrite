<script>
    import {
        createEventDispatcher
    } from 'svelte';

    import {
        fade,
        fly
    } from 'svelte/transition';

    export let show = false;
    export let fullscreen = false;
    export let persistent = false;
</script>

<style>
    .modal-background {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 998;
    }

    .modal {
        position: absolute;
        left: 50%;
        top: 50%;
        width: calc(100vw - 2em);
        max-width: 32em;
        max-height: calc(100vh - 4em);
        overflow: auto;
        transform: translate(-50%, -50%);
        padding: 1em;
        border-radius: 0.2em;
        background-color: var(--background-color);
        z-index: 999;
    }

    .modal-close {
        float: right;
        margin-right: 1em;
        opacity: 0.65;
        cursor: pointer;
    }

    .modal-close:hover {
        opacity: 1;
    }

    .modal.fullscreen {
        max-width: 100vw;
        height: 100vh;
        max-height: 100vh;
        width: 100vw;
        text-align: center;
        background-color: var(--secondary-color);
    }
</style>
{#if show}
<div class='modal-background' on:click='{() => show = false}'></div>

<div class='modal' in:fly="{{ y: 200, duration: 200 }}" class:fullscreen="{fullscreen}">
    {#if !persistent}
        <div class="modal-close" on:click='{() => show = false}'>
            <span class="lnr lnr-cross" />
        </div>
    {/if}
    <slot name='header'></slot>
    <slot></slot>
</div>
{/if}