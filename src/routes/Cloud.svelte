<script>
    import {
        onMount
    } from "svelte";

    import Alert from "../shared/Alert.svelte";

    import {
        state
    } from "../stores";

    import {
        cloud
    } from "../cloud";

    let dataLoaded = false;
    $: lastCloudSave = new Date($state.lastCloudSave).toLocaleString("en-us");
    $: lastLocalSave = new Date($state.lastLocalSave).toLocaleString("en-us");

    let registerName;
    let registerUser;
    let registerPass;

    let loginUser;
    let loginPass;

    let isUserLoggedIn = false;

    let showAlert = false;
    let showAlertType;
    let showAlertText;

    onMount(() => {
        checkLogin();
    });

    let saveCloudButtonLoading = false;

    function saveCloud() {
        saveCloudButtonLoading = true;
        cloud.saveToCloud().then((retValue) => {
            if (retValue == true) {
                saveCloudButtonLoading = false;
            }
        });
    }

    let getCloudButtonLoading = false;

    async function getCloud() {
        getCloudButtonLoading = true;
        cloud.saveFromCloud().then((retValue) => {
            if (retValue == true) {
                getCloudButtonLoading = false;
            }
        })
    }

    let loginButtonLoading = false;

    function login() {
        loginButtonLoading = true;
        cloud.login(loginUser, loginPass)
            .then((loggedInUser) => {
                state.setCurrentUser(loggedInUser.objectId, loggedInUser.email, loggedInUser['user-token']);
                checkLogin();
                showAlert = false;
                loginButtonLoading = false;
            })
            .catch((error) => {
                showAlert = true;
                showAlertText = error.message
                loginButtonLoading = false;
            })
    }

    let registerButtonLoading = false;

    function register() {
        registerButtonLoading = true;
        cloud.register(registerName, registerUser, registerPass)
            .then((registeredUser) => {
                return registeredUser;
            })
            .then(() => {
                checkLogin();
                registerButtonLoading = false;
                showAlert = true;
                showAlertText = "Please activate your e-mail adress."
            })
            .catch((error) => {
                showAlert = true;
                showAlertText = error.message
                registerButtonLoading = false;
            })
    }

    let logoutButtonLoading = false;

    function logout() {
        logoutButtonLoading = true;
        cloud.logout().then(() => {
            checkLogin();
            logoutButtonLoading = false;
        })
    }

    async function checkLogin() {
        dataLoaded = false;
        cloud.isUserLoggedIn().then((retValue) => {
            isUserLoggedIn = retValue;
            dataLoaded = true;
        })
    }
</script>

<style>

</style>
{#if dataLoaded}
{#if showAlert}
<Alert danger on:close="{() => showAlert = false}">
    <i class="icon-warning" slot="title"/>{showAlertText}
</Alert>
{/if}
{#if isUserLoggedIn}
<h2>Account</h2>
<div class="field">
    <label class="big" for="editChapterInput">Connected Account:</label>
    {$state.currentUserEmail}
</div>
<div class="btn-group">
    <button on:click={logout} disabled={logoutButtonLoading} class:loading={logoutButtonLoading}>
        <i class="icon-spinner_2 spinner" />
        Logout
    </button>
</div>
<h2>Cloud</h2>
<div class="field">
    <label class="big" for="localDataFrom">Local data from:</label>
    <span id="localDataFrom">{lastLocalSave}</span>
</div>
<div class="field">
    <label class="big" for="newName">Cloud data from:</label>
    <span id="localDataFrom">{lastCloudSave}</span>
</div>
<div class="btn-group">
    <button on:click={saveCloud} disabled={saveCloudButtonLoading} class:loading={saveCloudButtonLoading}>
        <i class="icon-spinner_2 spinner" />
        Export
    </button>
    <button on:click={getCloud} disabled={getCloudButtonLoading} class:loading={getCloudButtonLoading}>
        <i class="icon-spinner_2 spinner" />
        Import
    </button>
</div>
{:else}
<h2>Login</h2>
<div class="field">
    <label class="big" for="loginUser">E-Mail:</label>
    <input id="loginUser" type="email" autocomplete="off" bind:value={loginUser}>
</div>
<div class="field">
    <label class="big" for="loginPass">Password:</label>
    <input id="loginPass" type="password" autocomplete="off" bind:value={loginPass}>
</div>
<div class="btn-group">
    <button on:click={login} disabled={loginButtonLoading} class:loading={loginButtonLoading}>
        <i class="icon-spinner_2 spinner" />
        Login
    </button>
</div>
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
<div class="btn-group">
    <button on:click={register} disabled={registerButtonLoading} class:loading={registerButtonLoading}>
        <i class="icon-spinner_2 spinner"/>
        Register
    </button>
</div>
{/if}
{:else}
<div class="lds-ellipsis">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
</div>
{/if}