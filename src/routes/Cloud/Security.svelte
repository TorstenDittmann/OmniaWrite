<script>
  import { _ } from "svelte-i18n";
  
  import { settings } from "../../stores";
  import cloud from "../../appwrite";
  import moment from "moment";
  import "moment/locale/de";

  import Spinner from "../../shared/Spinner.svelte";

  moment.locale($settings.language);

  function logoutSession(id) {
    cloud.logoutSession(id);
  }
</script>

<style>
  ul {
    padding-inline-start: 0px;
    margin-block-start: 0;
    margin-block-end: 0;
  }

  ul li {
    padding: 2rem 1rem;
    display: flex;
    justify-content: space-between;
    opacity: 1;
    transition: all 0.5s ease;
    max-width: 800px;
  }

  li span {
    flex: 0 0 20%;
  }

  ul li:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  .lnr {
    font-size: 2rem;
    margin-top: -0.5rem;
    cursor: pointer;
  }
  span.flex-item {
    font-size: 0.8rem;
  }
</style>

<h2>{$_('cloud.security.devices.title')}</h2>
{#await cloud.getSessions()}
  <Spinner />
{:then devices}
  <ul>
    {#each devices as device}
      <li>
        <span>{device.OS.name}</span>
        <span>{device.geo.country}</span>
        <span>{device.ip}</span>
        <span on:click={() => logoutSession(device.$id)} class="lnr lnr-exit" />
      </li>
    {/each}
  </ul>
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}

<h2>{$_('cloud.security.logs.title')}</h2>
{#await cloud.getSecurityLog()}
  <Spinner />
{:then logs}
  <ul>
    {#each logs as log}
      <li class="flex-container">
        <span class="flex-item">{moment(log.time, "X").fromNow()}</span>
        <span class="flex-item">
          {moment(log.time, "X").format("MMMM Do YYYY, h:mm a")}
        </span>
        <b class="flex-item">{log.event}</b>
      </li>
    {/each}
  </ul>
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}
