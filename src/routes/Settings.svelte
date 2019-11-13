<script>
    let selectedTheme;
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
</script>

<style>

</style>

<h1>Settings</h1>

<h2>Appereance</h2>
<div class="field">
    <label class="big" for="editTheme">Theme:</label>
    <select id="editTheme" bind:value={selectedTheme}>
        <option value="dark">Dark</option>
        <option value="light">Light</option>
    </select>
</div>
<h2>Write</h2>
<h2>Database</h2>
<h2>Mindmap</h2>
<h2>Other</h2>
<small>Alpha version</small>