<script>
    import {
        _,
        locale
    } from 'svelte-i18n';

    let selectedTheme;
    let selectedLanguage;
    $: {
        switch (selectedTheme) {
            case "dark":
                document.body.className = "";
                break;
            case "light":
                document.body.className = "light";
                break;
            default:
                break;
        }
    }
    $: {
        switch (selectedLanguage) {
            case "en":
                locale.set('en')
                break;
            case "de":
                locale.set('de')
                break;
            default:
                break;
        }
    }
</script>

<style>

</style>

<h1>{$_('settings.title')}</h1>

<h2>{$_('settings.appereance.title')}</h2>
<div class="field">
    <label class="big" for="editTheme">{$_('settings.appereance.theme.title')}</label>
    <select id="editTheme" bind:value={selectedTheme}>
        <option value="dark">{$_('settings.appereance.theme.dark')}</option>
        <option value="light">{$_('settings.appereance.theme.light')}</option>
    </select>
</div>
<div class="field">
    <label class="big" for="editTheme">{$_('settings.appereance.language.title')}</label>
    <select id="editTheme" bind:value={selectedLanguage}>
        <option value="en">{$_('settings.appereance.language.en')}</option>
        <option value="de">{$_('settings.appereance.language.de')}</option>
    </select>
</div>