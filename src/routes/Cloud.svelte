<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { settings } from "../stores";
  import { _ } from "svelte-i18n";
  import { push, location } from "svelte-spa-router";
  import { Grid, GridElement } from "../components/Grid";
  import Router from "svelte-spa-router";
  import cloud from "../appwrite";
  import Toast from "../shared/Toast.svelte";
  import Spinner from "../shared/Spinner.svelte";
  import Login from "./Cloud/Login.svelte";
  import Register from "./Cloud/Register.svelte";
  import Security from "./Cloud/Security.svelte";
  import Profile from "./Cloud/Profile.svelte";
  import Backups from "./Cloud/Backups.svelte";
  import ResetPassword from "./Cloud/ResetPassword.svelte";
  import Logout from "./Cloud/Logout.svelte";
  import moment from "moment";
  import "moment/locale/de";

  moment.locale($settings.language);

  const prefix = "/cloud";
  const routes = {
    "/": Login,
    "/register": Register,

    "/security": Security,
    "/profile": Profile,
    "/reset-password": ResetPassword,
    "/backups": Backups,
    "/logout": Logout,
  };

  let loading = true;

  let isUserLoggedIn = false;
  let isUserVerified = false;

  let showToast = false;
  let showToastText;

  onMount(() => {
    checkLogin();
  });

  const checkLogin = () => {
    loading = true;
    cloud
      .isUserLoggedIn()
      .then(
        (response) => {
          isUserVerified = response.emailVerification;
          isUserLoggedIn = response.$id ? true : false;
        },
        () => {
          isUserLoggedIn = false;
        }
      )
      .finally(() => {
        loading = false;
      });
  };

  const createConfirmation = () => {
    cloud.createConfirmation();
    showToast = true;
    showToastText = $_("cloud.confirm.success");
  };
</script>

<style lang="scss">
  .cloud-container {
    max-width: 800px;
    margin: auto;
    text-align: center;
  }
</style>

<Toast bind:show={showToast} text={showToastText} />

<div class="cloud-container" in:fade={{ duration: 100 }}>
  {#if !loading}
    {#if isUserLoggedIn}
      {#if !isUserVerified}
        <Grid>
          <GridElement on:click={createConfirmation}>
            {$_('cloud.confirm.text')}
          </GridElement>
        </Grid>
      {:else}
        <Grid>
          {#if $location === '/cloud'}
            <GridElement on:click={() => push('/cloud/backups')}>
              <h2>{$_('cloud.backups.title')}</h2>
            </GridElement>
            <GridElement on:click={() => push('/cloud/security')}>
              <h2>{$_('cloud.security.title')}</h2>
            </GridElement>
            <GridElement on:click={() => push('/cloud/profile')}>
              <h2>{$_('cloud.profile.title')}</h2>
            </GridElement>
            <GridElement on:click={() => push('/cloud/logout')}>
              <h2>{$_('cloud.logout.title')}</h2>
            </GridElement>
          {:else}
            <GridElement on:click={() => push('/cloud')}>
              <span class="lnr lnr-arrow-left" />
            </GridElement>
          {/if}
        </Grid>
      {/if}
    {/if}
    <Router {routes} {prefix} />
  {:else}
    <Spinner />
  {/if}
</div>
