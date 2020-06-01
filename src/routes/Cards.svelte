<script lang="javascript">
  import { fade } from "svelte/transition";
  import { cards, state } from "../stores";
  import { _ } from "svelte-i18n";

  import Input from "../components/Input.svelte";
  import Textarea from "../components/Textarea.svelte";
  import Checkbox from "../components/Checkbox.svelte";
  import ButtonGroup from "../components/ButtonGroup.svelte";
  import Button from "../components/Button.svelte";

  import Placeholder from "../shared/Placeholder.svelte";
  import Modal from "../shared/Modal.svelte";
  import Search from "../components/Search.svelte";

  let showCreateCard = false;
  let showEditCard = false;
  let searchInput = "";

  let newCardObject = {
    title: "",
    content: "",
    showTooltip: false,
  };

  let editCardObject = {
    id: null,
    project: null,
    title: "",
    content: "",
    showTooltip: false,
  };

  function createCard() {
    if (newCardObject.title.length > 0) {
      cards.createCard(
        $state.currentProject,
        newCardObject.title,
        newCardObject.content,
        newCardObject.showTooltip
      );
      showCreateCard = false;
    }
  }

  const editCard = () => {
    if (editCardObject.title.length > 0) {
      cards.setCard(editCardObject);
      showEditCard = false;
    }
  };

  const removeCard = (cardId) => {
    let confirmed = confirm($_("overview.cards.confirmDelete"));
    if (confirmed == true) {
      showEditCard = false;
      cards.removeCard(cardId);
    }
  };

  $: filteredCards = searchInput
    ? $cards.filter(
        (card) =>
          card.project == $state.currentProject &&
          (card.title.toLowerCase().includes(searchInput.toLowerCase()) ||
            card.content.toLowerCase().includes(searchInput.toLowerCase()))
      )
    : $cards.filter((card) => card.project == $state.currentProject);
</script>

<Modal bind:show={showCreateCard}>
  <h2 slot="header">{$_('cards.modal.newHeader')}</h2>
  <form on:submit|preventDefault={createCard}>
    <Input
      label={$_('cards.modal.title')}
      bind:value={newCardObject.title}
      autofocus="true"
      autocomplete="off"
      placeholder={$_('placeholder.title')}
      helper={$_('cards.modal.helper.title')} />
    <Textarea
      label={$_('cards.modal.content')}
      bind:value={newCardObject.content} />
    <Checkbox
      label={$_('cards.modal.showInScenes')}
      bind:value={newCardObject.showTooltip}
      helper={$_('cards.modal.helper.tooltip')} />
    <ButtonGroup>
      <Button on:click={createCard} disabled={newCardObject.title.length === 0}>
        {$_('cards.modal.buttonSave')}
      </Button>
    </ButtonGroup>
  </form>
</Modal>

<Modal bind:show={showEditCard}>
  <h2 slot="header">{$_('cards.modal.editHeader')} '{editCardObject.title}'</h2>
  <form on:submit|preventDefault={editCard}>
    <Input
      label={$_('cards.modal.title')}
      bind:value={editCardObject.title}
      autocomplete="off"
      placeholder={$_('cards.modal.placeholder.title')}
      helper={$_('cards.modal.helper.title')} />
    <Textarea
      label={$_('cards.modal.content')}
      bind:value={editCardObject.content} />
    <Checkbox
      label={$_('cards.modal.showInScenes')}
      bind:value={editCardObject.showTooltip}
      helper={$_('cards.modal.helper.tooltip')} />
    <ButtonGroup>
      <Button on:click={editCard} disabled={editCardObject.title.length === 0}>
        {$_('cards.modal.buttonSave')}
      </Button>
      <Button on:click={() => removeCard(editCardObject.id)} color="red">
        {$_('cards.modal.buttonDelete')}
      </Button>
    </ButtonGroup>
  </form>
</Modal>

<div in:fade={{ duration: 100 }}>
  {#if $state.currentProject}
    <Search
      placeholder={$_('cards.search')}
      bind:value={searchInput}
      autocomplete="off" />
    <div id="cards" class="grid">
      <div class="new" on:click={() => (showCreateCard = true)}>
        <span class="lnr lnr-plus-circle" />
      </div>
      {#each filteredCards as card}
        <div
          id="card"
          on:click={() => {
            [showEditCard, editCardObject] = [true, card];
          }}>
          <h2>
            {#if card.showTooltip}
              <span class="lnr lnr-checkmark-circle" />
            {/if}
            {card.title}
          </h2>
          {card.content}
        </div>
      {/each}
    </div>
  {:else}
    <Placeholder />
  {/if}
</div>
