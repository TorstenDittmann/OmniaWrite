<script lang="javascript">
  import { intern, settings } from "../stores";
  import { checkRequirements, deskgap } from "../utils";
  import { onMount } from "svelte";
  import { _ } from "svelte-i18n";

  import Modal from "./Modal.svelte";
  import Disclaimer from "./Disclaimer.svelte";
  import Cloud from "../routes/Cloud.svelte";

  let choice = "none";
  let requirements = checkRequirements();
  let installed = false;
  let installable = false;
  let showInstall = false;
  let showDisclaimer = false;
  let statusDisclaimer = false;

  onMount(() => {
    // variable store event
    window.deferredPrompt = {};

    // if the app can be installed emit beforeinstallprompt
    window.addEventListener("beforeinstallprompt", e => {
      installable = showInstall = true;

      // prevent default event
      e.preventDefault();

      // store install avaliable event
      window.deferredPrompt = e;
    });

    // if are standalone android OR safari
    if (
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true
    ) {
      installable = showInstall = false;
    }

    // do action when finished install
    window.addEventListener("appinstalled", e => {
      console.log("success app install!");
    });
  });

  function install(e) {
    window.deferredPrompt.prompt();
    window.deferredPrompt.userChoice.then(choiceResult => {
      if (choiceResult.outcome === "accepted") {
        showInstall = false;
        installed = true;
      } else {
        console.log("User dismissed the prompt");
      }
      window.deferredPrompt = null;
    });
  }
</script>

<style type="text/css">
  .overlay {
    position: fixed; /* Sit on top of the page content */
    display: block; /* Hidden by default */
    width: 100%; /* Full width (cover the whole page) */
    height: 100%; /* Full height (cover the whole page) */
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    text-align: center;
    background-color: var(
      --secondary-color
    ); /* Black background with opacity */
    z-index: 999999; /* Specify a stack order in case you're using a different order for other elements */
    overflow: auto;
  }
  .install {
    max-width: 640px;
    display: inline-block;
    padding: 1rem;
    background-color: var(--background-color);
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
    opacity: 0.65;
  }

  .installHeader .control:hover {
    opacity: 1;
  }

  select#language {
    width: 100%;
  }

  .disclaimer-check {
    width: 3rem;
    margin-right: 1rem;
  }

  .disclaimer-button {
    width: calc(100% - 4rem);
  }
</style>

<div class="overlay">

  <div class:show={deskgap.isRunning()} class="installHeader" data-deskgap-drag>
    <span
      class="lnr lnr-cross control"
      on:click={deskgap.closeWindow}
      data-deskgap-no-drag />
    <span
      class="lnr lnr-chevron-down control"
      on:click={deskgap.minimizeWindow}
      data-deskgap-no-drag />
  </div>

  <div class="install">
    <img src="logo.png" alt="OmniaWrite Logo" />
    <hr />
    {#if choice == 'none'}
      <h3>{$_('install.language')}</h3>
      <div class="field">
        <select bind:value={$settings.language} id="language">
          <option value="en">{$_('settings.appereance.language.en')}</option>
          <option value="de">{$_('settings.appereance.language.de')}</option>
        </select>
      </div>
      {#if showInstall}
        <h3>{$_('install.requirements.title')}</h3>
        <p>
          <span
            class="lnr"
            class:lnr-checkmark-circle={requirements.steps.internet}
            class:lnr-question-circle={!requirements.steps.internet} />
          {$_('install.requirements.internet')}
        </p>
        <p>
          <span
            class="lnr"
            class:lnr-checkmark-circle={requirements.steps.browser}
            class:lnr-cross-circle={!requirements.steps.browser} />
          {$_('install.requirements.browser')}
        </p>
        <p>
          <span
            class="lnr"
            class:lnr-checkmark-circle={requirements.steps.serviceWorker}
            class:lnr-question-circle={!requirements.steps.serviceWorker} />
          {$_('install.requirements.serviceWorker')}
        </p>
        <div class="grid">
          <div on:click={install}>
            <span class="lnr lnr-download installIcon" />
            <br />
            {$_('install.install.install')}
          </div>
          <div on:click={() => (showInstall = false)}>
            <span class="lnr lnr-cloud installIcon" />
            <br />
            {$_('install.install.browser')}
          </div>
        </div>
      {:else}
        <Modal bind:show={showDisclaimer}>
          <h2 slot="header">{$_('install.disclaimer.title')}</h2>
          <Disclaimer />
        </Modal>
        <h3>{$_('install.disclaimer.action')}</h3>
        <div class="btn-group">
          <button
            class="disclaimer-check"
            on:click={() => (statusDisclaimer = !statusDisclaimer)}>
            <span
              class="lnr"
              class:lnr-cross-circle={!statusDisclaimer}
              class:lnr-checkmark-circle={statusDisclaimer} />
          </button>
          <button
            class="disclaimer-button"
            on:click={() => (showDisclaimer = !showDisclaimer)}>
            {$_('install.disclaimer.show')}
          </button>
        </div>
        {#if statusDisclaimer}
          <div class="grid">
            <div on:click={() => ($intern.installed = true)}>
              <span class="lnr lnr-rocket installIcon" />
              <br />
              {$_('install.start')}
            </div>
            <div on:click={() => (choice = 'cloud')}>
              <span class="lnr lnr-cloud installIcon" />
              <br />
              {$_('install.cloud')}
            </div>
          </div>
        {/if}
        {#if installable}
          <div class="grid">
            <div on:click={() => (showInstall = true)}>
              <span class="lnr lnr-arrow-left-circle" />
              {$_('install.back')}
            </div>
          </div>
        {/if}
      {/if}
    {:else}
      <div class="grid">
        <div on:click={() => (choice = 'none')}>
          <span class="lnr lnr-arrow-left-circle" />
          {$_('install.back')}
        </div>
      </div>
    {/if}

    {#if choice == 'cloud'}
      <Cloud />
    {/if}
  </div>
</div>
