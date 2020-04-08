<script lang="javascript">
  import { fade } from "svelte/transition";
  import { cards, state } from "../stores";
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
    if (newCardObject.title.length > 0) {
      cards.createCard(
        $state.currentProject,
        newCardObject.title,
        newCardObject.content,
        newCardObject.showTooltip
      );
      showCreateCard = false;
    } else {
      window.alert("Title can't be empty.");
    }
  }

  function editCard() {
    if (editCardObject.title.length > 0) {
      cards.setCard(editCardObject);
      showEditCard = false;
    } else {
      window.alert("Title can't be empty.");
    }
  }
  function removeCard(cardId) {
    let confirmed = confirm($_("overview.cards.confirmDelete"));
    if (confirmed == true) {
      showEditCard = false;
      cards.removeCard(cardId);
    }
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
  <h2 slot="header">{$_("cards.modal.newHeader")}</h2>
  <form on:submit|preventDefault={createCard}>
    <div class="field">
      <label for="createTitle">{$_("cards.modal.title")}</label>
      <input
        id="createTitle"
        autocomplete="off"
        placeholder="enter your title"
        type="text"
        bind:value={newCardObject.title} />
    </div>
    <div class="field">
      <label for="createContent">{$_("cards.modal.content")}</label>
      <textarea
        id="createContent"
        rows="10"
        bind:value={newCardObject.content} />
    </div>
    <div class="field">
      <label for="showTooltip">{$_("cards.modal.showInScenes")}</label>
      <p>
        <input
          id="showTooltip"
          type="checkbox"
          bind:checked={newCardObject.showTooltip} />
        <label for="showTooltip" />
      </p>
    </div>
    {#if newCardObject.title.length > 0}
      <div class="btn-group">
        <button on:click|preventDefault={createCard}>
          {$_("cards.modal.buttonSave")}
        </button>
      </div>
    {/if}
  </form>
</Modal>

<Modal bind:show={showEditCard}>
  <h2 slot="header">{$_("cards.modal.editHeader")} '{editCardObject.title}'</h2>
  <form on:submit|preventDefault={editCard}>
    <div class="field">
      <label for="createTitle">{$_("cards.modal.title")}</label>
      <input
        id="createTitle"
        autocomplete="off"
        placeholder="enter your title"
        type="text"
        bind:value={editCardObject.title} />
    </div>
    <div class="field">
      <label for="createContent">{$_("cards.modal.content")}</label>
      <textarea
        id="createContent"
        rows="10"
        bind:value={editCardObject.content} />
    </div>
    <div class="field">
      <label for="showTooltip">{$_("cards.modal.showInScenes")}</label>
      <p>
        <input
          id="showTooltip"
          type="checkbox"
          bind:checked={editCardObject.showTooltip} />
        <label for="showTooltip" />
      </p>
    </div>
    <div class="btn-group">
      {#if editCardObject.title.length > 0}
        <button on:click|preventDefault={editCard}>
          {$_("cards.modal.buttonSave")}
        </button>
      {/if}
      <button
        style="float: right;"
        class="warning"
        on:click={() => removeCard(editCardObject.id)}>
        {$_("sidebar.modal.edit.buttonDelete")}
      </button>
    </div>
  </form>
</Modal>

<div in:fade={{ duration: 100 }}>
  {#if $state.currentProject}
    <div class="field">
      <input
        autocomplete="off"
        placeholder={$_("cards.search")}
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
</div>
