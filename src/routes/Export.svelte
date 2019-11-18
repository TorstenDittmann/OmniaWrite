<script>
    import {
        generateDownload
    } from '../export';

    function download(evt) {
        const file = input.files[0];

        generateDownload(241781, file)
    }
</script>
<style>

</style>
<input type="file" id="input">

<button on:click={download}>Download</button>