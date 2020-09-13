<script>
  import { _ } from "svelte-i18n";
  import Modal from "./Modal.svelte";

  export let show = true;
</script>

<Modal bind:show>
  <h2 slot="header">{$_('common.update.title')}</h2>
  <p>
    After a lot of work from contributions from the community we are happy to
    release a major update to OmniaWrite.
  </p>

  <h3>📖 Revised Export</h3>
  <p>
    Export has been completely revised. You now can select from different
    templates for eBooks that will be extended with more templates.
  </p>

  <h3>✍ New Editor</h3>
  <p>
    The editor received was completely re-built with speed and performance in
    mind.
  </p>
  <p>
    Additionally the cards shown in the editor were moved to its own window
    found at the top toolbar.
  </p>

  <h3>📱 Matured mobile</h3>
  <p>
    The mobile version will have the same functionality as the desktop one from
    now.
  </p>

  <i>And much more...</i>
</Modal>
