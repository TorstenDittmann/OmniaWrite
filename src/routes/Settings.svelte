<script>
    import {
        onMount
    } from "svelte";

    import {
        state
    } from "../stores";

    import {
        cloud
    } from "../cloud";

    let exportButtonStatus = true;
    let importButtonStatus = true;

    let registerName;
    let registerUser;
    let registerPass;

    let loginUser;
    let loginPass;

    let isUserLoggedIn = false;

    onMount(() => {
        checkLogin();
    });

    function saveCloud() {
        exportButtonStatus = false;
        cloud.saveToCloud().then((retValue) => {
            if (retValue == true) {
                exportButtonStatus = true;
            }
        });
    }

    async function getCloud() {
        importButtonStatus = false;
        cloud.saveFromCloud().then((retValue) => {
            if (retValue == true) {
                importButtonStatus = true;
            }
        })
    }

    function login() {
        cloud.login(loginUser, loginPass).then(() => {
            checkLogin();
        });
    }

    function register() {
        cloud.register(registerName, registerUser, registerPass).then(() => {
            checkLogin();
        });
    }

    function logout() {
        cloud.logout().then(() => {
            checkLogin();
        })
    }

    async function checkLogin() {
        isUserLoggedIn = await cloud.isUserLoggedIn()
    }
</script>

<style>

</style>

<h1>Settings</h1>

{#if isUserLoggedIn}
<h2>Account</h2>
<div class="field">
    <label class="big" for="editChapterInput">Connected Account:</label>
    <input id="editChapterInput" autocomplete="off" value={$state.currentUser} readonly>
</div>
<button on:click={logout}>Logout</button>
<h2>Cloud</h2>
<button on:click={saveCloud} disabled={!exportButtonStatus}>Export</button>
<button on:click={getCloud} disabled={!importButtonStatus}>Import</button>
{:else}
<h2>Register</h2>
<div class="field">
    <label class="big" for="newName">Name:</label>
    <input id="newName" type="text" autocomplete="off" bind:value={registerName}>
</div>
<div class="field">
    <label class="big" for="newUser">E-Mail:</label>
    <input id="newUser" type="email" autocomplete="off" bind:value={registerUser}>
</div>
<div class="field">
    <label class="big" for="newPass">Password:</label>
    <input id="newPass" type="password" autocomplete="off" bind:value={registerPass}>
</div>
<button on:click={register}>Register</button>
<h2>Login</h2>
<div class="field">
    <label class="big" for="loginUser">E-Mail:</label>
    <input id="loginUser" type="email" autocomplete="off" bind:value={loginUser}>
</div>
<div class="field">
    <label class="big" for="loginPass">Password:</label>
    <input id="loginPass" type="password" autocomplete="off" bind:value={loginPass}>
</div>
<button on:click={login}>Login</button>
{/if}

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