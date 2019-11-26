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

    import {
        _
    } from 'svelte-i18n';

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
                showToastText = $_('cloud.toast.savedCloud');
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
                showToastText = $_('cloud.toast.loginSuccessful');
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
                showAlertText = $_('cloud.toast.activateEmail');
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
                showAlertText = $_('cloud.toast.resetPassword');
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
    <span class="lnr lnr-warning"> {showAlertText}
</Alert>
{#if isUserLoggedIn}
<h2>{$_('cloud.account.title')}</h2>
<div class="field">
    <label class="big" for="editChapterInput">{$_('cloud.account.connectedAccount')}</label>
    {$state.currentUserEmail}
</div>
<div class="btn-group">
    <button on:click={logout} disabled={logoutButtonLoading} class:loading={logoutButtonLoading}>
        <span class="lnr lnr-sync spinner" />
        {$_('cloud.account.logout')}
    </button>
</div>
<h2>{$_('cloud.cloud.title')}</h2>
<div class="field">
    <label class="big" for="localDataFrom">{$_('cloud.cloud.localDataFrom')}</label>
    <span id="localDataFrom">{lastLocalSave}</span>
</div>
<div class="field">
    <label class="big" for="newName">{$_('cloud.cloud.cloudDataFrom')}</label>
    <span id="localDataFrom">{lastCloudSave}</span>
</div>
<div class="btn-group">
    <button on:click={saveCloud} disabled={saveCloudButtonLoading} class:loading={saveCloudButtonLoading}>
        <span class="lnr lnr-sync spinner" />
        {$_('cloud.cloud.export')}
    </button>
    <button on:click={getCloud} disabled={getCloudButtonLoading} class:loading={getCloudButtonLoading}>
        <span class="lnr lnr-sync spinner" />
        {$_('cloud.cloud.import')}
    </button>
</div>
{:else}
<h2>{$_('cloud.login.title')}</h2>
<div class="field">
    <label class="big" for="loginUser">{$_('cloud.login.email')}</label>
    <input id="loginUser" type="email" placeholder="john.doe@email.tld" bind:value={loginUser}>
</div>
<div class="field">
    <label class="big" for="loginPass">{$_('cloud.login.password')}</label>
    <input id="loginPass" type="password" autocomplete="off" placeholder="******" bind:value={loginPass}>
</div>
<div class="btn-group">
    <button on:click={login} disabled={loginButtonLoading} class:loading={loginButtonLoading}>
        <span class="lnr lnr-sync spinner" />
        {$_('cloud.login.button')}
    </button>
</div>
<h2>{$_('cloud.register.title')}</h2>
<div class="field">
    <label class="big" for="newName">{$_('cloud.register.name')}</label>
    <input id="newName" type="text" placeholder="John Doe" autocomplete="off" bind:value={registerName}>
</div>
<div class="field">
    <label class="big" for="newUser">{$_('cloud.login.email')}</label>
    <input id="newUser" type="email" placeholder="john.doe@email.tld" autocomplete="off" bind:value={registerUser}>
</div>
<div class="field">
    <label class="big" for="newPass">{$_('cloud.login.password')}</label>
    <input id="newPass" type="password" autocomplete="off" placeholder="******" bind:value={registerPass}>
</div>
<div class="btn-group">
    <button on:click={register} disabled={registerButtonLoading} class:loading={registerButtonLoading}>
        <span class="lnr lnr-sync spinner" />
        {$_('cloud.register.button')}
    </button>
</div>
<h2>{$_('cloud.reset.title')}</h2>
<div class="field">
    <label class="big" for="resetUser">{$_('cloud.login.email')}</label>
    <input id="resetUser" type="email" placeholder="john.doe@email.tld" autocomplete="off" bind:value={resetUser}>
</div>
<div class="btn-group">
    <button on:click={resetPassword} disabled={resetButtonLoading} class:loading={resetButtonLoading}>
        <span class="lnr lnr-sync spinner" />
        {$_('cloud.reset.button')}
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