<script>
  import { settings } from "../../stores";
  import { deskgap } from "../../utils";
  import cloud from "../../appwrite";
  import moment from "moment";
  import "moment/locale/de";

  moment.locale($settings.language);

  function restoreBackup(id) {
    cloud.restoreBackup(id).then(response => deskgap.reload());
  }
</script>

<style>

</style>

<h2>Backups</h2>
{#await cloud.getAllBackups()}
  <div class="lds-ellipsis">
    <div />
    <div />
    <div />
    <div />
  </div>
{:then backups}
  <ul>
    {#each backups.files as backup}
      <li on:click={() => restoreBackup(backup.$uid)}>
        {moment(backup.dateCreated, 'X').fromNow()}
      </li>
    {/each}
  </ul>
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}
