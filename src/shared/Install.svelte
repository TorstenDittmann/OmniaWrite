<script>
    import {
        intern
    } from "../stores";
    import Modal from './Modal.svelte';
    import Cloud from '../routes/Cloud.svelte';

    export let showInstall = false;
    let choice = "none";
</script>

<style>
    .install {
        max-width: 640px;
        display: inline-block;
    }

    .installIcon {
        text-align: center;
        font-size: 3rem;
    }
</style>

<Modal bind:show={showInstall} fullscreen="true" persistent>
    <div class="installHeader" slot="header" data-deskgap-drag>
        First Launch
    </div>

    <div class="install">
        {#if choice == "none"}
        <div class="grid">
            <div on:click={()=> choice = "cloud"}>
                <span class="lnr lnr-cloud installIcon" />
                Cloud
            </div>
            <div>
                <span class="lnr lnr-file-empty installIcon" />
                Sample Project
            </div>
            <div on:click={()=> $intern.installed = true}>
                <span class="lnr lnr-rocket installIcon" />
                Start
            </div>
        </div>
        {:else}
        <div class="grid">
            <div class="" on:click={()=> choice = "none"}>
                <span class="lnr lnr-arrow-left-circle" /> back
            </div>
        </div>
        {/if}

        {#if choice == "cloud"}
        <Cloud />
        {/if}
    </div>
</Modal>