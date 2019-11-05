<script>
    import {
        onMount
    } from "svelte";
    import RemoteStorage from 'remotestoragejs';
    import Widget from 'remotestorage-widget';

    const remoteStorage = new RemoteStorage({
        cache: false
    });
    const widget = new Widget(remoteStorage);

    onMount(() => {
        remoteStorage.setApiKeys({
            googledrive: '554940208405-hhpi0q02gquvqrps39gptbh5r7e4qlcc.apps.googleusercontent.com'
        });

        remoteStorage.access.claim('OmniaWriteData', 'rw');

        widget.attach('cloudContainer');
    });

    function saveCloud() {
        const client = remoteStorage.scope('/OmniaWriteData/');

        client.storeFile('text/plain', 'omniawrite.omniawritedata', JSON.stringify(localStorage))
            .then(() => console.log("data has been saved"));
    }

    function getCloud() {
        const client = remoteStorage.scope('/OmniaWriteData/');

        client.getFile('omniawrite.omniawritedata').then(file => {
            let data = JSON.parse(file.data);
            Object.keys(data).forEach(function (k) {
                localStorage.setItem(k, data[k]);
            });
        });
    }
</script>

<style>
    #cloudContainer #remotestorage-widget {
        position: absolute !important;
    }
</style>

<h1>Settings</h1>

<h2>Cloud</h2>
<button on:click={saveCloud}>Export</button>
<button on:click={getCloud}>Import</button>
<div id="cloudContainer">
    <div id="remotestorage-widget"></div>
</div>
<h2>Account</h2>
<div class="field">
    <label class="big" for="editChapterInput">Connected Account:</label>
    <input id="editChapterInput" autocomplete="off" value="test@test.de" readonly>
</div>
<h2>Appereance</h2>
<div class="field">
    <label class="big" for="editChapterInput">Theme:</label>
    <select id="editChapterInput">
        <option value="volvo">Dark</option>
        <option value="saab">Light</option>
    </select>
</div>
<h2>Write</h2>
<h2>Database</h2>
<h2>Mindmap</h2>
<h2>Other</h2>
<small>Alpha version</small>