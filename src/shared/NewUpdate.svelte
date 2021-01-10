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
    <li>Simplified Chinese</li>
  </ul>
  <p />
  <h3>📶 Others</h3>
  <ul>
    <li>New Romance E-Book template</li>
    <li>Bug fixes</li>
    <li>Security fixes</li>
  </ul>
  <p />
</Modal>
