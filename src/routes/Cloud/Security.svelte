<script>
  import { settings } from "../../stores";
  import cloud from "../../appwrite";
  import moment from "moment";
  import "moment/locale/de";

  moment.locale($settings.language);

  cloud.getSessions().then(res => {
    console.log(res);
  });

  function codeToString(code) {
    switch (code) {
      case "auth.login":
        return "Login";
        break;

      case "auth.logout":
        return "Logout";
        break;

      default:
        return "-";
        break;
    }
  }

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

  ul li:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  .lnr {
    font-size: 2rem;
    margin-top: -0.5rem;
    cursor: pointer;
  }
</style>

<h2>Devices</h2>
{#await cloud.getSessions()}
  <div class="lds-ellipsis">
    <div />
    <div />
    <div />
    <div />
  </div>
{:then devices}
  <ul>
    {#each devices as device}
      <li>
        <span>{device.OS.name}</span>
        <span>{device.geo.country}</span>
        <span>{device.ip}</span>
        <span on:click={() => logoutSession(device.id)} class="lnr lnr-exit" />
      </li>
    {/each}
  </ul>
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}

<h2>Activity logs</h2>
{#await cloud.getSecurityLog()}
  <div class="lds-ellipsis">
    <div />
    <div />
    <div />
    <div />
  </div>
{:then logs}
  <ul>
    {#each logs as log}
      <li class="flex-container">
        <b class="flex-item">{codeToString(log.event)}</b>
        <span class="flex-item">{log.OS.name}</span>
        <span class="flex-item">{moment(log.time, 'X').fromNow()}</span>
        <span class="flex-item">
          {moment(log.time, 'X').format('MMMM Do YYYY, h:mm:ss a')}
        </span>
      </li>
    {/each}
  </ul>
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}
