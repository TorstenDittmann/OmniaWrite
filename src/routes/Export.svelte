<script>
    import {
        generateDownload
    } from '../export';
    import {
        state
    } from "../stores";

    let author;
    let downloadButtonLoading = false;

    function download() {
        downloadButtonLoading = true;
        const file = cover.files[0];

        generateDownload($state.currentProject, file, author).then(() => {
            downloadButtonLoading = false;
        })
    }
</script>
<style>

</style>
<h2>Export</h2>
<div class="field">
    <label class="big" for="author">Author:</label>
    <input id="author" type="text" placeholder="John Doe" autocomplete="off" bind:value={author}>
</div>
<div class="field">
    <label class="big" for="cover">Cover:</label>
    <input id="cover" type="file">
</div>
<div class="btn-group">
    <button on:click={download} disabled={downloadButtonLoading} class:loading={downloadButtonLoading}>
        <i class="icon-spinner_2 spinner" />
        Download
    </button>
</div>