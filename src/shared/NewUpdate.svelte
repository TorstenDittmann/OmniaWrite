<script>
  import { _ } from "svelte-i18n";
  import Modal from "./Modal.svelte";

  export let show = true;
</script>

<Modal bind:show>
  <h2 slot="header">{$_('common.update.title')}</h2>
  <h3>Lorem Ipsum</h3>
  <p>
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit, cumque
    neque dolore explicabo ex quisquam voluptatum tempora, voluptatem atque
    quidem quis quod placeat. Iusto nulla voluptate, voluptatem perferendis quos
    consequatur?
  </p>
  <h3>UI improvements</h3>
  <p>
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit, cumque
    neque dolore explicabo ex quisquam voluptatum tempora, voluptatem atque
    quidem quis quod placeat. Iusto nulla voluptate, voluptatem perferendis quos
    consequatur?
  </p>
</Modal>
