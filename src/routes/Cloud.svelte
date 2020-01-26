<script lang="javascript">
  import { onMount } from "svelte";
  import { state, settings } from "../stores";
  import { deskgap } from "../utils";
  import { _ } from "svelte-i18n";
  import { querystring, push } from "svelte-spa-router";
  import Router from "svelte-spa-router";

  import cloud from "../appwrite";
  import Toast from "../shared/Toast.svelte";

  import Login from "./Cloud/Login.svelte";
  import Register from "./Cloud/Register.svelte";
  import Security from "./Cloud/Security.svelte";
  import Profile from "./Cloud/Profile.svelte";
  import Backups from "./Cloud/Backups.svelte";
  import ResetPassword from "./Cloud/ResetPassword.svelte";

  import moment from "moment";
  import "moment/locale/de";

  moment.locale($settings.language);

  export let params = {};

  const prefix = "/cloud";
  const routes = {
    "/login": Login,
    "/register": Register,
    "/security": Security,
    "/profile": Profile,
    "/reset-password": ResetPassword,
    "/backups": Backups
  };

  let loading = true;

  let isUserLoggedIn = false;

  let showToast = false;
  let showToastText;

  let saveCloudButtonLoading = false;
  let getCloudButtonLoading = false;

  onMount(() => {
    let query = new URLSearchParams(window.location.search);

    checkLogin();
    if (params.loginReturn == "confirm") {
      console.log("gogo");
      cloud
        .confirm(query.get("userId"), query.get("token"))
        .then(response => console.log, error => console.log);
    }
    cloud.getSecurityLog().then(response => {
      console.log(response);
    });
  });

  function logout() {
    cloud.logout().then(checkLogin());
  }

  function cColl() {
    cloud.createCollection("test").then(response => {
      console.log(response);
    });
  }

  function saveToCloud() {
    cloud.saveToCloud().then(response => {
      console.log(response);
    });
  }

  function cDocu() {}

  function checkLogin() {
    loading = true;
    cloud.isUserLoggedIn().then(
      response => {
        console.log(response);
        loading = false;
        isUserLoggedIn = response.$uid ? true : false;
      },
      error => {
        console.log(error);
        loading = false;
        isUserLoggedIn = false;
      }
    );
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

<div class="cloud-container">
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
      <div id="cards" class="grid">
        <div id="card" on:click={() => push('/cloud/backups')}>
          <h2>Backups</h2>
        </div>
        <div id="card" on:click={() => push('/cloud/security')}>
          <h2>Security</h2>
        </div>
        <div id="card" on:click={() => push('/cloud/update')}>
          <h2>Profile</h2>
        </div>
        <div id="card" on:click={logout}>
          <h2>Logout</h2>
        </div>
      </div>
    {/if}
    <Router {routes} {prefix} />
    <div class="btn-group">
      <button on:click={cColl}>create Collection</button>
      <button on:click={cDocu}>create Document</button>
      <button on:click={cloud.uploadSettings}>uplaod Settings</button>
      <button on:click={cloud.deleteSettings}>del Settings</button>
      <button on:click={saveToCloud}>save to cloud</button>
      <button on:click={cloud.getFile}>get file</button>
      <button on:click={cloud.getFiles}>get files</button>
    </div>
  {:else}
    <div class="lds-ellipsis">
      <div />
      <div />
      <div />
      <div />
    </div>
  {/if}
</div>
