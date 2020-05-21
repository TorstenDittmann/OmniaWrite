<script lang="javascript">
  import { fade } from "svelte/transition";
  import { _, locale } from "svelte-i18n";
  import { push } from "svelte-spa-router";

  import { settings } from "../stores";

  import Select from "../components/Select.svelte";
  import Checkbox from "../components/Checkbox.svelte";
  import Range from "../components/Range.svelte";

  $: themes = [
    {
      value: "dark",
      text: $_("settings.appereance.theme.dark")
    },
    {
      value: "light",
      text: $_("settings.appereance.theme.light")
    }
  ];

  $: languages = [
    {
      value: "en",
      text: $_("settings.appereance.language.en")
    },
    {
      value: "de",
      text: $_("settings.appereance.language.de")
    }
  ];
</script>

<style type="text/css">
  .preview {
    max-width: 800px;
    padding: 1rem;
    border-radius: 0px 0px 0px 0px;
    -moz-border-radius: 0px 0px 0px 0px;
    -webkit-border-radius: 0px 0px 0px 0px;
    border: 2px dashed var(--editor-color);
  }
  .link {
    cursor: pointer;
  }
  .link:hover {
    text-decoration: underline;
  }
  .settings {
    max-width: 800px;
    margin: auto;
    text-align: center;
  }
</style>

<div class="settings" in:fade={{ duration: 100 }}>
  <h2>{$_("settings.appereance.title")}</h2>

  <Select 
    label={$_("settings.appereance.theme.title")} 
    bind:value={$settings.theme} 
    options={themes} />
  <Select 
    label={$_("settings.appereance.language.title")} 
    bind:value={$settings.language} 
    options={languages} />

  <h2>{$_("header.write.title")}</h2>

  <Checkbox 
    label={$_("settings.write.autosave")} 
    bind:value={$settings.autosave} />
  <Range 
    label={$_("settings.write.fontsize")}
    bind:value={$settings.fontsize}
    min=".6"
    max="1.2"
    step=".1" />

  <div id="codex-editor" class="preview">
    <div class="codex-editor">
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
      eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
      voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
      clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
      amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
      nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
      diam voluptua amet.
    </div>
  </div>
  <br />
  <small class="link" on:click={() => push("/thirdparty")}>
    {$_("settings.thirdparty")}
  </small>
  |
  <small class="link" on:click={() => push("/policy")}>
    {$_("cloud.privacy.show")}
  </small>
  |
  <small class="link" on:click={() => push("/disclaimer")}>
    {$_("install.disclaimer.show")}
  </small>
</div>
