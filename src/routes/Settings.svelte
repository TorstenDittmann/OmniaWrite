<script>
    import {
        onMount
    } from "svelte";
    import Backendless from 'backendless';

    let currentUser;


    const APP_ID = '***REMOVED***';
    const API_KEY = '***REMOVED***';

    Backendless.serverURL = 'https://api.backendless.com';
    Backendless.initApp(APP_ID, API_KEY);



    onMount(() => {
        Backendless.UserService.isValidLogin()
            .then(success)
            .catch(error)
    });

    function success(result) {
        console.log("Is login valid?: " + result);
        Backendless.UserService.getCurrentUser()
            .then(function (curUser) {
                currentUser = curUser.email;
            })
            .catch(function (error) {});
    }

    function error(err) {
        console.log(err.message);
        console.log(err.statusCode);
    }

    function logout() {
        Backendless.UserService.logout()
            .then(function () {})
            .catch(function (error) {});
    }

    function saveCloud() {
        let blob = new Blob(["\ufeff", JSON.stringify(localStorage)], {
            type: 'application/json'
        });
        console.log(blob);
        Backendless.Files.saveFile("testFolder", "t-dittmann.txt", blob, true)
            .then(function (savedFileURL) {
                console.log("file has been saved - " + savedFileURL);
            })
            .catch(function (error) {
                console.log("error - " + error.message);
            });
    }

    async function getCloud() {
        const response = await
        fetch(
            'https://backendlessappcontent.com/***REMOVED***/***REMOVED***/files/testFolder/t-dittmann.txt'
        );
        const data = await response.json();
        Object.keys(data).forEach(function (k) {
            localStorage.setItem(k, data[k]);
        });
        //console.log(JSON.stringify(myJson));
    }

    function login() {
        Backendless.UserService.login("torsten.dittmann@gmail.com", "test123", true)
            .then(function (loggedInUser) {
                console.log(loggedInUser);
            })
            .catch(function (error) {});
    }
</script>

<style>

</style>

<h1>Settings</h1>

<h2>Cloud</h2>
<button on:click={saveCloud}>Export</button>
<button on:click={getCloud}>Import</button>
<div id="cloudContainer">
</div>
<h2>Account</h2>
<div class="field">
    <label class="big" for="editChapterInput">Connected Account:</label>
    <input id="editChapterInput" autocomplete="off" value={currentUser} readonly>
    <button on:click={login}>Login</button>
    <button on:click={logout}>Logout</button>
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