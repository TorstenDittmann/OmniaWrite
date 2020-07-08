<script>
  import { intern, settings } from "../stores";
  import { onMount } from "svelte";
  import { _ } from "svelte-i18n";
  import { Button, ButtonGroup, Select, Checkbox } from "../components/Forms";

  import Modal from "./Modal.svelte";
  import Disclaimer from "./Disclaimer.svelte";
  import Spinner from "./Spinner.svelte";

  let installable = false;
  let showInstall = false;
  let disclaimer = false;
  let showDisclaimer = false;

  let step = "init";

  $: languages = [
    {
      value: "en",
      text: $_("settings.appereance.language.en"),
    },
    {
      value: "de",
      text: $_("settings.appereance.language.de"),
    },
    {
      value: "pt",
      text: $_("settings.appereance.language.pt"),
    },
  ];
</script>

<style lang="scss">
  .install {
    text-align: center;
  }

  .header {
    background-color: var(--primary-color);
    padding: 1rem;
    font-family: "IBM Plex Mono";

    img {
      height: 7.5rem;
    }
  }

  .link {
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
</style>

<Modal show="true" persistent="true">
  <div class="install">
    <div class="header">
      <img src="logo.svg" alt="OmniaWrite Logo" />
      <h3 class="subtitle">The first step to your novel</h3>
    </div>
    <Select
      label={$_('settings.appereance.language.title')}
      bind:value={$settings.language}
      options={languages} />
    <Checkbox
      bind:value={disclaimer}
      label={$_('install.disclaimer.title')}
      helper={$_('install.disclaimer.action')} />
    <ButtonGroup>
      <Button
        disabled={!disclaimer}
        on:click={() => ($intern.installed = true)}>
        {$_('install.install.browser')}
      </Button>
    </ButtonGroup>
    <small class="link" on:click={() => (showDisclaimer = true)}>
      {$_('install.disclaimer.show')}
    </small>
  </div>
</Modal>

<Modal bind:show={showDisclaimer}>
  <h2 slot="header">{$_('install.disclaimer.title')}</h2>
  <Disclaimer />
</Modal>
