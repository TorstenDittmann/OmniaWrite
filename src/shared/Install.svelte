<script lang="javascript">
  import { intern, settings } from "../stores";
  import { checkRequirements, deskgap, isRunningElectron } from "../utils";
  import { onMount } from "svelte";
  import { _ } from "svelte-i18n";

  import Modal from "./Modal.svelte";
  import Disclaimer from "./Disclaimer.svelte";
  import Spinner from "./Spinner.svelte";

  let choice = "none";
  let requirements = checkRequirements();
  let installed = false;
  let installable = false;
  let showInstall = false;
  let showDisclaimer = false;
  let statusDisclaimer = false;

  let installStep = "init";

  onMount(() => {
    window.deferredPrompt = {};
    window.addEventListener("beforeinstallprompt", e => {
      installable = true;
      installStep = "language";
      e.preventDefault();
      window.deferredPrompt = e;
    });

    if (
      !"serviceWorker" in navigator ||
      !navigator.serviceWorker.controller ||
      navigator.userAgent.indexOf("Firefox") > -1 ||
      navigator.userAgent.indexOf("Edge") > -1 ||
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true
    ) {
      installStep = "language";
      installable = false;
    }
  });

  function install(e) {
    window.deferredPrompt.prompt();
    window.deferredPrompt.userChoice.then(choiceResult => {
      if (choiceResult.outcome === "accepted") {
        $intern.installed = true;
      }
      window.deferredPrompt = null;
    });
  }
</script>

<style type="text/css">
  .overlay {
    position: fixed;
    display: flex;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    text-align: center;
    background-color: var(--secondary-color);
    z-index: 999999;
    overflow: auto;
    align-items: center;
    flex-direction: column;
  }
  .install {
    width: 320px;
    display: inline-block;
    padding: 1rem;
    background-color: var(--background-color);
    margin: auto;
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

  .field label {
    flex: 0 1 16rem;
    cursor: pointer;
  }

  .field p {
    flex: 0 1 4rem;
  }
</style>

<div class="overlay">
  <div
    class:show={isRunningElectron}
    class="installHeader"
    style="-webkit-app-region: drag">
    <span
      class="lnr lnr-cross control"
      on:click={deskgap.closeWindow}
      style="-webkit-app-region: drag" />
    <span
      class="lnr lnr-chevron-down control"
      on:click={deskgap.minimizeWindow}
      style="-webkit-app-region: drag" />
  </div>

  <div class="install">
    {#if installStep === 'init'}
      <img src="logo.png" alt="OmniaWrite Logo" />
      <hr />
      <Spinner />
    {:else if installStep === 'language'}
      <img src="logo.png" alt="OmniaWrite Logo" />
      <h3>{$_('install.language')}</h3>
      <div class="field">
        <select bind:value={$settings.language} id="language">
          <option value="en">{$_('settings.appereance.language.en')}</option>
          <option value="de">{$_('settings.appereance.language.de')}</option>
        </select>
      </div>
      <div class="grid">
        <div on:click={() => (installStep = 'disclaimer')}>
          <span class="lnr lnr-arrow-right-circle" />
          {$_('install.continue')}
        </div>
      </div>
    {:else if installStep === 'disclaimer'}
      <Modal bind:show={showDisclaimer}>
        <h2 slot="header">{$_('install.disclaimer.title')}</h2>
        <Disclaimer />
      </Modal>
      <div class="field">
        <p>
          <input id="terms" type="checkbox" bind:checked={statusDisclaimer} />
          <label for="terms" />
        </p>
        <label class="big" on:click={() => (showDisclaimer = true)}>
          {$_('install.disclaimer.action')}
        </label>
      </div>
      <div class="grid">
        <div on:click={() => (installStep = 'language')}>
          <span class="lnr lnr-arrow-left-circle" />
          {$_('install.back')}
        </div>
        {#if statusDisclaimer}
          <div on:click={() => (installStep = 'install')}>
            <span class="lnr lnr-arrow-right-circle" />
            {$_('install.continue')}
          </div>
        {/if}
      </div>
    {:else if installStep === 'install'}
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
          class:lnr-question-circle={!requirements.steps.browser} />
        {$_('install.requirements.browser')}
      </p>
      {#if !requirements.steps.browser}
        {$_('install.requirements.warning.browser')}
      {/if}
      <div class="grid">
        <div on:click={() => ($intern.installed = true)}>
          <span class="lnr lnr-rocket installIcon" />
          <br />
          {$_('install.install.browser')}
        </div>
        {#if requirements.installable}
          <div on:click={install}>
            <span class="lnr lnr-download installIcon" />
            <br />
            {$_('install.install.install')}
          </div>
        {/if}
      </div>
    {/if}
  </div>
</div>
