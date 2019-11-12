<script>
    import {
        createEventDispatcher
    } from 'svelte';

    import {
        fade,
        fly
    } from 'svelte/transition';

    export let show = false;
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
        background-color: #1b2a32;
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
</style>
{#if show}
<div class='modal-background' on:click='{() => show = false}'></div>

<div class='modal' in:fly="{{ y: 200, duration: 200 }}">
    <div class="modal-close" on:click='{() => show = false}'>
        <i class="icon-cross_mark" />
    </div>
    <slot name='header'></slot>
    <hr>
    <slot></slot>
</div>
{/if}