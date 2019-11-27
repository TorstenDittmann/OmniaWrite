<script>
    import {
        _,
        locale
    } from 'svelte-i18n';

    import {
        settings
    } from "../stores";
</script>

<style></style>

<h1>{$_('settings.title')}</h1>

<h2>{$_('settings.appereance.title')}</h2>
<div class="field">
    <label class="big" for="editTheme">{$_('settings.appereance.theme.title')}</label>
    <select id="editTheme" bind:value={$settings.theme}>
        <option value="dark">{$_('settings.appereance.theme.dark')}</option>
        <option value="light">{$_('settings.appereance.theme.light')}</option>
    </select>
</div>
<div class="field">
    <label class="big" for="editTheme">{$_('settings.appereance.language.title')}</label>
    <select id="editTheme" bind:value={$settings.language}>
        <option value="en">{$_('settings.appereance.language.en')}</option>
        <option value="de">{$_('settings.appereance.language.de')}</option>
    </select>
</div>