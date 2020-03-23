<script lang="javascript">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { state, settings } from "../stores";
  import { deskgap } from "../utils";
  import { _ } from "svelte-i18n";
  import { querystring, push } from "svelte-spa-router";
  import Router from "svelte-spa-router";

  import cloud from "../appwrite";
  import Toast from "../shared/Toast.svelte";
  import Spinner from "../shared/Spinner.svelte";

  import Login from "./Cloud/Login.svelte";
  import LoginSuccess from "./Cloud/Login/Success.svelte";
  import LoginFailure from "./Cloud/Login/Failure.svelte";

  import Register from "./Cloud/Register.svelte";
  import RegisterConfirm from "./Cloud/Register/Confirm.svelte";
  import RegisterSuccess from "./Cloud/Register/Success.svelte";
  import RegisterFailure from "./Cloud/Register/Failure.svelte";

  import Security from "./Cloud/Security.svelte";
  import Profile from "./Cloud/Profile.svelte";
  import Backups from "./Cloud/Backups.svelte";
  import ResetPassword from "./Cloud/ResetPassword.svelte";
  import Logout from "./Cloud/Logout.svelte";

  import moment from "moment";
  import "moment/locale/de";

  moment.locale($settings.language);

  export let params = {};

  const prefix = "/cloud";
  const routes = {
    "/login": Login,
    "/login-success": LoginSuccess,
    "/login-failure": LoginFailure,

    "/register": Register,
    "/register-confirm": RegisterConfirm,
    "/register-success": RegisterSuccess,
    "/register-failure": RegisterFailure,

    "/security": Security,
    "/profile": Profile,
    "/reset-password": ResetPassword,
    "/backups": Backups,
    "/logout": Logout
  };

  let loading = true;

  let isUserLoggedIn = false;
  let isUserVerified = false;

  let showToast = false;
  let showToastText;

  let saveCloudButtonLoading = false;
  let getCloudButtonLoading = false;

  onMount(() => {
    let query = new URLSearchParams(window.location.search);

    checkLogin();
    if (params.loginReturn == "confirm") {
      cloud
        .confirm(query.get("userId"), query.get("token"))
        .then(response => console.log, error => console.log);
    }
  });

  function logout() {
    cloud.logout().then(checkLogin());
  }

  function checkLogin() {
    loading = true;
    cloud
      .isUserLoggedIn()
      .then(
        response => {
          isUserVerified = response.emailVerification;
          isUserLoggedIn = response.$id ? true : false;
        },
        error => {
          isUserLoggedIn = false;
        }
      )
      .finally(() => {
        loading = false;
      });
  }

  function createConfirmation() {
    cloud.createConfirmation();
    showToast = true;
    showToastText = "Confirmation e-mail has been sent!";
  }
</script>

<style type="text/css">
  .cloud-container {
    max-width: 800px;
    margin: auto;
    text-align: center;
  }
</style>

<Toast bind:show={showToast} text={showToastText} />

<div class="cloud-container" in:fade={{ duration: 100 }}>
  {#if !loading}
    {#if !isUserLoggedIn}
      <div id="cards" class="grid">
        <div class="card" on:click={() => push('/cloud/login')}>
          <h2>Login</h2>
        </div>
        <div class="card" on:click={() => push('/cloud/register')}>
          <h2>Register</h2>
        </div>
      </div>
    {:else}
      {#if !isUserVerified}
        <div class="grid">
          <div on:click={createConfirmation}>
            Your account is not verfied yet! Click here to verify your account.
          </div>
        </div>
      {/if}
      <div class="grid">
        {#if !params.loginReturn}
          <div on:click={() => push('/cloud/backups')}>
            <h2>Backups</h2>
          </div>
          <div on:click={() => push('/cloud/security')}>
            <h2>Security</h2>
          </div>
          <div on:click={() => push('/cloud/profile')}>
            <h2>Profile</h2>
          </div>
          <div on:click={() => push('/cloud/logout')}>
            <h2>Logout</h2>
          </div>
        {:else}
          <div on:click={() => push('/cloud')}>
            <span class="lnr lnr-arrow-left-circle" />
            {$_('install.back')}
          </div>
        {/if}
      </div>
    {/if}
    <Router {routes} {prefix} />
  {:else}
    <Spinner />
  {/if}
</div>
