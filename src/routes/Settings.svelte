<script lang="javascript">
  import { _, locale } from "svelte-i18n";
  import { push } from "svelte-spa-router";

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
  .link {
    cursor: pointer;
  }
  .link:hover {
    text-decoration: underline;
  }
</style>

<h1>Settings</h1>

<h2>Appereance</h2>
<div class="field">
    <label class="big" for="editChapterInput">Theme:</label>
    <select id="editChapterInput">
        <option value="volvo">Dark</option>
        <option value="saab">Light</option>
    </select>
</div>
<br />
<small class="link" on:click={() => push('/thirdparty')}>
  {$_('settings.thirdparty')}
</small>
