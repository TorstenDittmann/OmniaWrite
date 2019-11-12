<script>
    import {
        onMount
    } from "svelte";

    import Alert from "../shared/Alert.svelte";
    import Toast from '../shared/Toast.svelte';

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

    let resetUser;

    let isUserLoggedIn = false;

    let showAlert = false;
    let showAlertType;
    let showAlertText;

    let showToast = false;
    let showToastText;

    let saveCloudButtonLoading = false;
    let getCloudButtonLoading = false;
    let loginButtonLoading = false;
    let registerButtonLoading = false;
    let logoutButtonLoading = false;
    let resetButtonLoading = false;


    onMount(() => {
        checkLogin();
    });

    function saveCloud() {
        saveCloudButtonLoading = true;
        cloud.saveToCloud().then((retValue) => {
            if (retValue == true) {
                saveCloudButtonLoading = false;

                showToast = true;
                showToastText = "Saved into cloud.";
            }
        });
    }

    async function getCloud() {
        getCloudButtonLoading = true;
        cloud.saveFromCloud().then((retValue) => {
            if (retValue == true) {
                getCloudButtonLoading = false;
                window.location.reload();
            }
        })
    }

    function login() {
        loginButtonLoading = true;
        cloud.login(loginUser, loginPass)
            .then((loggedInUser) => {
                state.setCurrentUser(loggedInUser.objectId, loggedInUser.email, loggedInUser['user-token']);
                checkLogin();
                showAlert = false;
                loginButtonLoading = false;
                showToast = true;
                showToastText = "Login successful!";
            })
            .catch((error) => {
                showAlert = true;
                showAlertText = error.message + (error.code ? " - code: " + error.code : "");
                loginButtonLoading = false;
            })
    }

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
                showAlertText = "Please activate your e-mail adress.";
            })
            .catch((error) => {
                showAlert = true;
                showAlertText = error.message + (error.code ? " - code: " + error.code : "");
                registerButtonLoading = false;
            })
    }

    function resetPassword() {
        resetButtonLoading = true;
        Backendless.UserService.restorePassword(resetUser)
            .then(() => {
                showAlert = true;
                showAlertText = "Please check your mail inbox for further instructions.";
                resetButtonLoading = false;
            })
            .catch((error) => {
                showAlert = true;
                showAlertText = error.message + (error.code ? " - code: " + error.code : "");
                resetButtonLoading = false;
            });
    }

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

<Toast bind:show={showToast} text={showToastText} />

{#if dataLoaded}
<Alert danger bind:show={showAlert}>
    <i class="icon-warning" slot="title"/>{showAlertText}
</Alert>
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
    <input id="loginUser" type="email" placeholder="john.doe@email.tld" bind:value={loginUser}>
</div>
<div class="field">
    <label class="big" for="loginPass">Password:</label>
    <input id="loginPass" type="password" autocomplete="off" placeholder="******" bind:value={loginPass}>
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
    <input id="newName" type="text" placeholder="John Doe" autocomplete="off" bind:value={registerName}>
</div>
<div class="field">
    <label class="big" for="newUser">E-Mail:</label>
    <input id="newUser" type="email" placeholder="john.doe@email.tld" autocomplete="off" bind:value={registerUser}>
</div>
<div class="field">
    <label class="big" for="newPass">Password:</label>
    <input id="newPass" type="password" autocomplete="off" placeholder="******" bind:value={registerPass}>
</div>
<div class="btn-group">
    <button on:click={register} disabled={registerButtonLoading} class:loading={registerButtonLoading}>
        <i class="icon-spinner_2 spinner"/>
        Register
    </button>
</div>
<h2>Password reset</h2>
<div class="field">
    <label class="big" for="resetUser">E-Mail:</label>
    <input id="resetUser" type="email" placeholder="john.doe@email.tld" autocomplete="off" bind:value={resetUser}>
</div>
<div class="btn-group">
    <button on:click={resetPassword} disabled={resetButtonLoading} class:loading={resetButtonLoading}>
        <i class="icon-spinner_2 spinner" />
        Reset password
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