<script>
  import { _ } from "svelte-i18n";
  import Modal from "./Modal.svelte";

  export let show = true;
</script>

<Modal bind:show>
  <h2 slot="header">{$_('common.update.title')}</h2>
  <h3>🦺 Security</h3>
  <p>This update fixed some security issues.</p>
</Modal>
