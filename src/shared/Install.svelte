<script lang="javascript">
  import { intern, settings } from "../stores";
  import { checkRequirements, deskgap } from "../utils";
  import { _ } from "svelte-i18n";

  import Modal from "./Modal.svelte";
  import Cloud from "../routes/Cloud.svelte";

  let choice = "none";
  let requirements = checkRequirements();
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
    cursor: pointer; /* Add a pointer on hover */
    overflow: auto;
  }
  .install {
    max-width: 640px;
    display: inline-block;
    padding: 2rem;
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
    <h1>OmniaWrite</h1>
    <hr />
    {#if choice == 'none'}
      <h3>{$_('install.language')}</h3>
      <div class="field">
        <select bind:value={$settings.language} id="language">
          <option value="en">{$_('settings.appereance.language.en')}</option>
          <option value="de">{$_('settings.appereance.language.de')}</option>
        </select>
      </div>
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
    {:else}
      <div class="grid">
        <div class="" on:click={() => (choice = 'none')}>
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
