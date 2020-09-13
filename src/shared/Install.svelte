<script>
  import { intern, settings } from "../stores";
  import { _ } from "svelte-i18n";
  import { Button, ButtonGroup, Select, Checkbox } from "../components/Forms";
  import Modal from "./Modal.svelte";
  import Disclaimer from "./Disclaimer.svelte";

  let disclaimer = false;
  let showDisclaimer = false;

  $: languages = [
    {
      value: "en",
      text: $_("settings.appereance.language.en"),
    },
    {
      value: "de",
      text: $_("settings.appereance.language.de"),
    },
  ];
</script>

<Modal show="true" persistent="true">
  <h2 slot="header">OmniaWrite</h2>
  <div class="install">
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
        {$_('install.action')}
      </Button>
    </ButtonGroup>
    <p class="link" on:click={() => (showDisclaimer = true)}>
      {$_('install.disclaimer.show')}
    </p>
  </div>
</Modal>

<Modal bind:show={showDisclaimer}>
  <h2 slot="header">{$_('install.disclaimer.title')}</h2>
  <Disclaimer />
</Modal>

<style lang="scss">
  .install {
    text-align: center;
  }

  .link {
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
</style>
