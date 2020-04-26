<script>
  import { _ } from "svelte-i18n";

  import Modal from "./Modal.svelte";

  import { ui } from "../stores";

  let email;
  let description;

  let sent = false;

  const send = () => {
    fetch(
      "https://doorbell.io/api/applications/11083/submit?key=E2XjFpPM7gFQpj78ekxtNua2Qdcl2PqzqvxBBaDq6I30UOErH40aoAtkwYHWnTgx",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          message: description
        })
      }
    ).then(response => {
      if (response.ok) {
        sent = true;
      }
    });
    return true;
  };
</script>

<Modal bind:show={$ui.support.show}>
  {#if !sent}
    <h2>{$_('feedback.title')}</h2>
    {$_('feedback.sub')}
    <hr />
    <form on:submit|preventDefault={send}>
      <div class="field">
        <label class="big" for="email">{$_('feedback.email')}</label>
        <input
          id="email"
          type="email"
          placeholder="john.doe@email.tld"
          bind:value={email} />
      </div>
      <div class="field">
        <textarea rows="8" bind:value={description} />
      </div>
      <div class="btn-group">
        <button on:click|preventDefault={send}>
          <span class="lnr lnr-sync spinner" />
          {$_('feedback.action')}
        </button>
      </div>
    </form>
  {:else}
    <center>
      <span class="lnr lnr-checkmark-circle" style="font-size: 4rem" />
      <h2>{$_('feedback.success')}</h2>
    </center>
  {/if}
</Modal>
