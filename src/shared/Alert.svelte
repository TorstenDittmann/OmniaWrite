<script>
    import {
        createEventDispatcher
    } from 'svelte';
    import {
        fade,
        fly
    } from 'svelte/transition';

    export let show = false;

    export let danger = false;
    export let success = false;
    export let info = false;
    export let warning = false;

    export let duration = 10000;

    $: {
        if (show) {
            setTimeout(() => {
                    show = false;
                },
                duration)
        }
    }
</script>
<style>
    .alert {
        padding: 20px;
    }

    .alert.danger {
        background-color: #f44336;
    }

    .alert.success {
        background-color: #4CAF50;
    }

    .alert.info {
        background-color: #2196F3;
    }

    .alert.warning {
        background-color: #ff9800;
    }

    .alert i {
        line-height: normal;
    }

    .closebtn {
        color: white;
        float: right;
        line-height: 1rem;
        font-size: 1rem;
        cursor: pointer;
        transition: 0.3s;
        opacity: .65;
    }

    .closebtn:hover {
        opacity: 1;
    }
</style>
{#if show}
<div class="alert" class:danger class:success class:warning class:info>
    <span class="closebtn" on:click={()=> show = false}><i class="icon-cross_mark" /></span>
    <slot name='title'></slot>
    <slot> </slot>
</div>
{/if}