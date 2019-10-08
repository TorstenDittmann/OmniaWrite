<script>
    import {
        createEventDispatcher
    } from 'svelte';

    import {
        fade,
        fly
    } from 'svelte/transition';

    const dispatch = createEventDispatcher();
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

    button {
        display: block;
    }
</style>

<div class='modal-background' on:click='{() => dispatch("close")}'></div>

<div class='modal' in:fly="{{ y: 200, duration: 200 }}">
    <slot name='header'></slot>
    <hr>
    <slot></slot>
    <hr>
    <button on:click='{() => dispatch("close")}'>close modal</button>
</div>