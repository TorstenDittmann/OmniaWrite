<script lang="javascript">
  import { fade } from "svelte/transition";
  import { _, locale } from "svelte-i18n";
  import { push } from "svelte-spa-router";

  import { settings } from "../stores";
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
  <h2>{$_('settings.appereance.title')}</h2>
  <div class="field">
    <label class="big" for="editTheme">
      {$_('settings.appereance.theme.title')}
    </label>
    <select id="editTheme" bind:value={$settings.theme}>
      <option value="dark">{$_('settings.appereance.theme.dark')}</option>
      <option value="light">{$_('settings.appereance.theme.light')}</option>
    </select>
  </div>
  <div class="field">
    <label class="big" for="editTheme">
      {$_('settings.appereance.language.title')}
    </label>
    <select id="editLanguage" bind:value={$settings.language}>
      <option value="en">{$_('settings.appereance.language.en')}</option>
      <option value="de">{$_('settings.appereance.language.de')}</option>
    </select>
  </div>

  <h2>{$_('header.write.title')}</h2>
  <div class="field">
    <label class="big" for="autosave">{$_('settings.write.autosave')}</label>
    <p>
      <input id="autosave" type="checkbox" bind:checked={$settings.autosave} />
      <label for="autosave" />
    </p>
  </div>
  <div class="field">
    <label class="big" for="fontSize">{$_('settings.write.fontsize')}</label>
    <input
      id="fontSize"
      type="range"
      bind:value={$settings.fontsize}
      min=".6"
      max="1.2"
      step=".1" />
  </div>
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
  <small class="link" on:click={() => push('/thirdparty')}>
    {$_('settings.thirdparty')}
  </small>
  |
  <small class="link" on:click={() => push('/policy')}>
    {$_('cloud.privacy.show')}
  </small>
  |
  <small class="link" on:click={() => push('/disclaimer')}>
    {$_('install.disclaimer.show')}
  </small>
</div>
