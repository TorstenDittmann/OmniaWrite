<script>
  import { settings } from "../../stores";
  import { deskgap } from "../../utils";
  import cloud from "../../appwrite";
  import moment from "moment";
  import "moment/locale/de";

  import Spinner from "../../shared/Spinner.svelte";

  moment.locale($settings.language);

  let isLoadingBackup = false;

  function restoreBackup(id) {
    isLoadingBackup = true;
    cloud.restoreBackup(id).then(response => {
      isLoadingBackup = false;
      deskgap.reload();
    });
  }
  function formatBytes(a, b) {
    if (0 == a) return "0 Bytes";
    var c = 1024,
      d = b || 2,
      e = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
      f = Math.floor(Math.log(a) / Math.log(c));
    return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f];
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
    cursor: pointer;
  }

  ul li:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  .from-now {
    flex: 2;
  }

  .file-size {
    flex: 1;
  }

  .date {
    flex: 3;
  }
  .lnr {
    font-size: 2rem;
    margin-top: -0.5rem;
  }

  .file-size,
  .date {
    font-size: 0.8rem;
  }
</style>

{#if isLoadingBackup}
  <Spinner />
  <br />
  <i>Migrating backup</i>
{:else}
  <h2>Backups</h2>
  {#await cloud.getAllBackups()}
    <Spinner />
  {:then backups}
    <ul>
      {#each backups.files as backup}
        <li on:click={() => restoreBackup(backup.$id)}>
          <span class="from-now">
            {moment(backup.dateCreated, 'X').fromNow()}
          </span>
          <span class="date">
            {moment(backup.dateCreated, 'X').format('MMMM Do YYYY, h:mm:ss a')}
          </span>
          <span class="file-size">{formatBytes(backup.sizeOriginal)}</span>
          <span class="lnr lnr-cloud-download" />
        </li>
      {/each}
    </ul>
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
{/if}
