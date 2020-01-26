<script>
  import cloud from "../../appwrite";
</script>

<style>

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
      <li>{device.OS.name}</li>
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
      <li>{log.event}</li>
    {/each}
  </ul>
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}
