<script>
    import {
        createEventDispatcher
    } from 'svelte';
    import {
        fade,
        fly
    } from 'svelte/transition';

    const dispatch = createEventDispatcher();

    export let danger = false;
    export let success = false;
    export let info = false;
    export let warning = false;

    export let duration = 0;

    if (duration > 0) {
        setTimeout(() => dispatch("close"), (duration * 1000));
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
<div class="alert" class:danger class:success class:warning class:info>
    <span class="closebtn" on:click={()=> dispatch("close")}><i class="icon-cross_mark" /></span>
    <slot name='title'></slot>
    <slot> </slot>
</div>