<script>
    import {
        cards,
        state
    } from "../stores";
    import Modal from '../shared/Modal.svelte';
    import {
        createEventDispatcher
    } from 'svelte';

    let showCreateCard = false;
    let showEditCard = false;
    let searchInput = "";

    let newCardObject = {
        title: null,
        content: null,
        showTooltip: false
    };

    let editCardObject = {
        id: null,
        project: null,
        title: null,
        content: null,
        showTooltip: false
    };

    function createCard() {
        cards.createCard($state.currentProject, newCardObject.title, newCardObject.content, newCardObject.showTooltip);
        showCreateCard = false;
    }

    function editCard() {
        cards.setCard(editCardObject);
        showEditCard = false;
    }

    $: filteredCards = searchInput ?
        $cards.filter(card => card.project == $state.currentProject &&
            (
                card.title.toLowerCase().startsWith(searchInput.toLowerCase()) ||
                card.content.toLowerCase().includes(searchInput.toLowerCase())
            )
        ) :
        $cards.filter(card => card.project == $state.currentProject);
</script>

<Modal bind:show={showCreateCard}>
    <h2 slot="header">
        New 'card'
        <small><em>noun</em> \ ˈkärd</small>
    </h2>
    <div class="field">
        <label for="createTitle">Title:</label>
        <input id="createTitle" autocomplete="off" placeholder="enter your title" type="text"
            bind:value={newCardObject.title}>
    </div>
    <div class="field">
        <label for="createContent">Content:</label>
        <textarea id="createContent" rows="10" bind:value={newCardObject.content}></textarea>
    </div>
    <div class="field">
        <input type="checkbox" name="createTooltop" id="createTooltop" bind:checked={newCardObject.showTooltip}>
        <label class="big" for="createTooltop">Show in scenes</label>
    </div>
    <div class="btn-group">
        <button on:click={createCard}>Create</button>
    </div>
</Modal>

<Modal bind:show={showEditCard}>
    <h2 slot="header">
        Edit 'card'
        <small><em>noun</em> \ ˈkärd</small>
    </h2>
    <div class="field">
        <label for="createTitle">Title:</label>
        <input id="createTitle" autocomplete="off" placeholder="enter your title" type="text"
            bind:value={editCardObject.title}>
    </div>
    <div class="field">
        <label for="createContent">Content:</label>
        <textarea id="createContent" rows="10" bind:value={editCardObject.content}></textarea>
    </div>
    <div class="field">
        <input type="checkbox" name="createTooltop" id="createTooltop" bind:checked={editCardObject.showTooltip}>
        <label class="big" for="createTooltop">Show in scenes</label>
    </div>
    <div class="btn-group">
        <button on:click={editCard}>Save</button>
    </div>
</Modal>

<div class="field">
    <input autocomplete="off" placeholder="search here..." type="search" bind:value={searchInput}>
</div>
<div id="cards" class="grid">
    <div class="new" on:click={()=> showCreateCard = true}>
        <i class="icon-plus"></i>
    </div>
    {#each filteredCards as card}
    <div id="card" on:click={() => {[showEditCard, editCardObject] = [true, card]}} >
        <h2>{#if card.showTooltip}<i class="icon-check_circle" />{/if} {card.title}</h2>
        {card.content}
    </div>
    {/each}
</div>