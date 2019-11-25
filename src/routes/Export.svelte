<script>
    import {
        Export,
        ExportRTF
    } from '../export';
    import {
        state
    } from "../stores";
    import {
        _
    } from 'svelte-i18n';

    let author;
    let downloadButtonLoading = false;

    function download() {
        downloadButtonLoading = true;
        const file = cover.files[0];
        let generateDownload = new Export($state.currentProject, file, author);
        generateDownload.fetchTemplate().then(() => {
            downloadButtonLoading = false;
        }).finally(() => {
            generateDownload = null;
        })
    }

    function downloadRTF() {
        let generateDownload = new ExportRTF($state.currentProject, author);
        generateDownload.fetchTemplate().then(() => {
            downloadButtonLoading = false;
        }).finally(() => {
            generateDownload = null;
        })
    }
</script>
<style>

</style>
<h2>{$_('export.title')}</h2>
<div class="field">
    <label class="big" for="author">{$_('export.author')}</label>
    <input id="author" type="text" placeholder="John Doe" autocomplete="off" bind:value={author}>
</div>
<div class="field">
    <label class="big" for="cover">{$_('export.cover')}</label>
    <input id="cover" type="file">
</div>
<div class="btn-group">
    <button on:click={download} disabled={downloadButtonLoading} class:loading={downloadButtonLoading}>
        <i class="icon-spinner_2 spinner" />
        {$_('export.downloadEpub')}
    </button>
</div>
<div class="btn-group">
    <button on:click={downloadRTF}>
        <i class="icon-spinner_2 spinner" />
        {$_('export.downloadRtf')}
    </button>
</div>