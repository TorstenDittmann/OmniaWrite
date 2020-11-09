<script>
  import { _ } from "svelte-i18n";
  import Modal from "./Modal.svelte";

  export let show = true;
</script>

<Modal bind:show>
  <h2 slot="header">{$_('common.update.title')}</h2>
  <h3>🌐 More languages</h3>
  <p>We added support for following languages:</p>
  <ul>
    <li>Spanish</li>
    <li>Finnish</li>
    <li>Dutch</li>
    <li>Japanese</li>
    <li>Portugese</li>
    <li>Russian</li>
    <li>Turkish</li>
    <li>Swedish</li>
    <li>Turkish</li>
  </ul>
  <p />
</Modal>
