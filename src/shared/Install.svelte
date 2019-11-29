<script>
    import {
        intern,
        settings
    } from "../stores";
    import {
        checkRequirements,
        deskgap
    } from "../utils";
    import {
        _
    } from 'svelte-i18n';
    import Modal from './Modal.svelte';
    import Cloud from '../routes/Cloud.svelte';

    export let showInstall = false;
    let choice = "none";
    let requirements = checkRequirements();
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

    .installHeader {
        display: none;
        height: 4rem;
        background-color: var(--primary-color);
        width: 100vw;
    }

    .installHeader.show {
        display: block;
    }

    .installHeader .control {
        color: var(--menu-link);
        cursor: pointer;
        float: right;
        line-height: 4rem;
        font-size: 1.5rem;
        padding: 0 1rem;
        opacity: .65;
    }

    .installHeader .control:hover {
        opacity: 1;
    }

    select#language {
        width: 100%
    }
</style>

<Modal bind:show={showInstall} fullscreen="true" persistent>

    <div class:show="{deskgap.isRunning()}" class="installHeader" slot="header" data-deskgap-drag>
        <span class="lnr lnr-cross control" on:click={deskgap.closeWindow} data-deskgap-no-drag />
        <span class="lnr lnr-chevron-down control" on:click={deskgap.minimizeWindow} data-deskgap-no-drag />
    </div>

    <div class="install">
        <img src="logo.png" alt="OmniaWrite Logo">
        <h1>OmniaWrite</h1>
        <hr>
        {#if choice == "none"}
        <h3>{$_('install.language')}</h3>
        <div class="field">
            <select bind:value={$settings.language} id="language">
                <option value="en">{$_('settings.appereance.language.en')}</option>
                <option value="de">{$_('settings.appereance.language.de')}</option>
            </select>
        </div>
        <h3>{$_('install.requirements.title')}</h3>
        <div class="field">
            <label class="big" for="editChapterInput">{$_('install.requirements.internet')}</label>
            {requirements.steps.internet}
        </div>
        <div class="field">
            <label class="big" for="editChapterInput">{$_('install.requirements.browser')}</label>
            {requirements.steps.browser}
        </div>
        <div class="field">
            <label class="big" for="editChapterInput">{$_('install.requirements.serviceWorker')}</label>
            {requirements.steps.serviceWorker}
        </div>
        <div class="grid">
            <div on:click={()=> $intern.installed = true}>
                <span class="lnr lnr-rocket installIcon" /><br>
                {$_('install.start')}
            </div>
            <div on:click={()=> choice = "cloud"}>
                <span class="lnr lnr-cloud installIcon" /><br>
                {$_('install.cloud')}
            </div>
            <!--<div>
                <span class="lnr lnr-file-empty installIcon" />
                {$_('install.sampleProject')}
            </div>-->
        </div>
        {:else}
        <div class="grid">
            <div class="" on:click={()=> choice = "none"}>
                <span class="lnr lnr-arrow-left-circle" /> {$_('install.back')}
            </div>
        </div>
        {/if}

        {#if choice == "cloud"}
        <Cloud />
        {/if}
    </div>
</Modal>