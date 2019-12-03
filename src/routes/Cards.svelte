<script lang="javascript">
  import { cards, state } from "../stores";
  import { createEventDispatcher } from "svelte";
  import { _ } from "svelte-i18n";

  import Placeholder from "../shared/Placeholder.svelte";
  import Modal from "../shared/Modal.svelte";

  let showCreateCard = false;
  let showEditCard = false;
  let searchInput = "";

  let newCardObject = {
    title: "",
    content: "",
    showTooltip: ""
  };

  let editCardObject = {
    id: null,
    project: null,
    title: "",
    content: "",
    showTooltip: ""
  };

  function createCard() {
    cards.createCard(
      $state.currentProject,
      newCardObject.title,
      newCardObject.content,
      newCardObject.showTooltip
    );
    showCreateCard = false;
  }

  function editCard() {
    cards.setCard(editCardObject);
    showEditCard = false;
  }

  $: filteredCards = searchInput
    ? $cards.filter(
        card =>
          card.project == $state.currentProject &&
          (card.title.toLowerCase().startsWith(searchInput.toLowerCase()) ||
            card.content.toLowerCase().includes(searchInput.toLowerCase()))
      )
    : $cards.filter(card => card.project == $state.currentProject);
</script>

<Modal bind:show={showCreateCard}>
  <h2 slot="header">{$_('cards.modal.newHeader')}</h2>
  <div class="field">
    <label for="createTitle">{$_('cards.modal.title')}</label>
    <input
      id="createTitle"
      autocomplete="off"
      placeholder="enter your title"
      type="text"
      bind:value={newCardObject.title} />
  </div>
  <div class="field">
    <label for="createContent">{$_('cards.modal.content')}</label>
    <textarea id="createContent" rows="10" bind:value={newCardObject.content} />
  </div>
  <div class="field">
    <label for="showTooltip">{$_('cards.modal.showInScenes')}</label>
    <div class="btn-group">
      <button
        id="showTooltip"
        class:green={newCardObject.showTooltip}
        class:red={!newCardObject.showTooltip}
        on:click={() => (newCardObject.showTooltip = !newCardObject.showTooltip)}>
        <span
          class="lnr"
          class:lnr-cross-circle={!newCardObject.showTooltip}
          class:lnr-checkmark-circle={newCardObject.showTooltip} />
      </button>
    </div>
  </div>
  <div class="btn-group">
    <button on:click={createCard}>{$_('cards.modal.buttonSave')}</button>
  </div>
  {#if newCardObject.title.length > 0}
    <div class="btn-group">
      <button on:click={createCard}>{$_('cards.modal.buttonSave')}</button>
    </div>
  {/if}
</Modal>

<Modal bind:show={showEditCard}>
  <h2 slot="header">{$_('cards.modal.editHeader')} '{editCardObject.title}'</h2>
  <div class="field">
    <label for="createTitle">{$_('cards.modal.title')}</label>
    <input
      id="createTitle"
      autocomplete="off"
      placeholder="enter your title"
      type="text"
      bind:value={editCardObject.title} />
  </div>
  <div class="field">
    <label for="createContent">{$_('cards.modal.content')}</label>
    <textarea
      id="createContent"
      rows="10"
      bind:value={editCardObject.content} />
  </div>
  <div class="field">
    <label for="showTooltip">{$_('cards.modal.showInScenes')}</label>
    <div class="btn-group">
      <button
        id="showTooltip"
        class:green={editCardObject.showTooltip}
        class:red={!editCardObject.showTooltip}
        on:click={() => (editCardObject.showTooltip = !editCardObject.showTooltip)}>
        <span
          class="lnr"
          class:lnr-cross-circle={!editCardObject.showTooltip}
          class:lnr-checkmark-circle={editCardObject.showTooltip} />
      </button>
    </div>
  </div>
  <div class="btn-group">
    <button on:click={editCard}>{$_('cards.modal.buttonSave')}</button>
  </div>
  {#if editCardObject.title.length > 0}
    <div class="btn-group">
      <button on:click={editCard}>{$_('cards.modal.buttonSave')}</button>
    </div>
  {/if}
</Modal>

{#if $state.currentProject}
  <div class="field">
    <input
      autocomplete="off"
      placeholder={$_('cards.search')}
      type="search"
      bind:value={searchInput} />
  </div>
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
