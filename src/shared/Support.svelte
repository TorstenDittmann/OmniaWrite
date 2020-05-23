<script>
  import { _ } from "svelte-i18n";

  import Modal from "./Modal.svelte";

  import InputEmail from "../components/InputEmail.svelte";
  import Textarea from "../components/Textarea.svelte";
  import Button from "../components/Button.svelte";
  import ButtonGroup from "../components/ButtonGroup.svelte";

  import { ui } from "../stores";

  let email;
  let description;

  let sent = false;
  let loading = false;

  const send = () => {
    loading = true;
    fetch(
      "https://doorbell.io/api/applications/11083/submit?key=E2XjFpPM7gFQpj78ekxtNua2Qdcl2PqzqvxBBaDq6I30UOErH40aoAtkwYHWnTgx",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          message: description,
        }),
      }
    ).then((response) => {
      loading = false;
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
      <InputEmail
        label={$_('feedback.email')}
        bind:value={email}
        placeholder="john.does@email.ltd" />
      <Textarea bind:value={description} label={$_('feedback.description')} />
      <ButtonGroup>
        <Button on:click={send} {loading}>{$_('feedback.action')}</Button>
      </ButtonGroup>
    </form>
  {:else}
    <center>
      <span class="lnr lnr-checkmark-circle" style="font-size: 4rem" />
      <h2>{$_('feedback.success')}</h2>
    </center>
  {/if}
</Modal>
