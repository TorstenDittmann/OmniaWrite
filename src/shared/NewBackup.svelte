<script>
  import { onMount } from "svelte";
  import { _ } from "svelte-i18n";

  import { state, settings } from "../stores";
  import { deskgap } from "../utils";
  import cloud from "../appwrite";
  import moment from "moment";
  import "moment/locale/de";

  import Modal from "./Modal.svelte";
  import Spinner from "./Spinner.svelte";

  moment.locale($settings.language);

  let latest;
  let show = false;
  let loading = false;

  onMount(async () => {
    latest = await cloud.getLatestBackup();

    if (latest.files.length === 0) return;

    show = $state.lastCloudSave < latest.files[0].dateCreated;
  });

  const download = () => {
    loading = true;
    cloud.restoreBackup(latest.files[0].$id).then(
      (response) => {
        loading = false;
        deskgap.reload();
      },
      (err) => {
        loading = false;
      }
    );
  };

  const formatBytes = (a, b) => {
    if (0 == a) return "0 Bytes";
    let c = 1024,
      d = b || 2,
      e = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
      f = Math.floor(Math.log(a) / Math.log(c));
    return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f];
  };
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

  .lnr {
    font-size: 2rem;
    margin-top: -0.5rem;
  }

  .file-size {
    font-size: 0.8rem;
  }
</style>

<Modal bind:show>
  <h2 slot="header">{$_('common.modals.newBackup.header')}</h2>
  <p>{$_('common.modals.newBackup.subtitle')}</p>
  {#if loading}
    <center>
      <Spinner />
    </center>
  {:else}
    <ul>
      <li on:click={download}>
        <span class="from-now">
          {moment(latest.files[0].dateCreated, 'X').fromNow()}
        </span>
        <span class="file-size">
          {formatBytes(latest.files[0].sizeOriginal)}
        </span>
        <span class="lnr lnr-cloud-download" />
      </li>
    </ul>
    <small>{$_('common.modals.newBackup.warning')}</small>
  {/if}
</Modal>
