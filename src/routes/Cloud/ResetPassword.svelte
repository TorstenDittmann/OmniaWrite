<script>
  import { _ } from "svelte-i18n";
  import { push } from "svelte-spa-router";
  import cloud from "../../appwrite";

  import { InputEmail, ButtonGroup, Button } from "../../components/Forms";

  let email = "";
  let recoverLoading = false;
  let recoverState = false;

  $: checkForm = email !== "";

  const recover = () => {
    recoverLoading = true;
    if (!checkForm) {
      recoverLoading = false;
      return;
    }
    cloud.recoverPassword(email).then((response) => {
      email = "";
      recoverState = true;
      recoverLoading = true;
    });
  };
</script>

<h2>{$_('cloud.reset.title')}</h2>
{#if recoverState}
  <span class="lnr lnr-checkmark-circle" />
  {$_('cloud.reset.success')}
{:else}
  <form on:submit|preventDefault={recover}>
    <InputEmail
      label={$_('cloud.login.email')}
      placeholder="john.doe@email.tld"
      bind:value={email} />
    <ButtonGroup>
      <Button on:click={recover} loading={recoverLoading} disabled={!checkForm}>
        {$_('cloud.reset.title')}
      </Button>
    </ButtonGroup>
  </form>
{/if}

<h2>{$_('cloud.reset.login')}</h2>
<ButtonGroup>
  <Button on:click={() => push('/cloud')}>{$_('cloud.login.title')}</Button>
</ButtonGroup>
