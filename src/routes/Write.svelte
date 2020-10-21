<script>
  import { onMount, onDestroy } from "svelte";
  import { fade } from "svelte/transition";
  import { scenes, chapters, cards, state, settings, ui } from "../stores";
  import { push } from "svelte-spa-router";
  import { _ } from "svelte-i18n";
  import EditorJS from "@editorjs/editorjs";
  import Quote from "@editorjs/quote";
  import Header from "@editorjs/header";
  import Paragraph from "@editorjs/paragraph";
  import tippy from "sveltejs-tippy";
  import Overview from "./Write/Overview.svelte";
  import Placeholder from "../shared/Placeholder.svelte";
  import Modal from "../shared/Modal.svelte";
  import { countWords, countChars } from "../utils";

  export let params = {};
  let currentScene;
  let editor;
  let editorRef;
  let editorStatus = 0;
  let showCards = false;
  let filteredCards = [];
  let countWord = 0;
  let countChar = 0;
  const editorLanguage = {
    placeholder: $_("write.editor.placeholder"),
    switch: $_("write.editor.switch"),
    delete: $_("write.editor.delete"),
    confirmDelete: $_("write.editor.confirmDelete"),
    blocks: {
      paragraph: $_("write.editor.blocks.paragraph"),
      heading: $_("write.editor.blocks.heading"),
      quote: $_("write.editor.blocks.quote"),
      code: $_("write.editor.blocks.code"),
    },
  };

  $: currentScene = $scenes.find(scene => scene.id == params.sceneId);
  $: {
    state.setCurrentTitle(
      params.sceneId ? currentScene.title : "No scene selected!"
    );
  }

  const titleInput = () => {
    scenes.setSceneTitle(currentScene.id, currentScene.title);
  };

  const editorStats = data => {
    const fullText = data.blocks.reduce(
      (prev, curr) => `${prev} ${curr.data.text}`,
      ""
    );
    countWord = countWords(fullText);
    countChar = countChars(fullText);
    filteredCards = $cards
      .filter(e => e.showTooltip && e.project == $state.currentProject)
      .filter(c =>
        data.blocks.some(
          block => block.data.text && block.data.text.includes(c.title)
        )
      );
  };

  onMount(() => {
    window.addEventListener("hashchange", routeChange, false);
    editor = new EditorJS({
      holder: editorRef,
      data: currentScene.content,
      autofocus: true,
      placeholder: $_("write.editor.placeholder"),
      initialBlock: "paragraph",
      onReady: async () => {
        const data = await editor.save();
        editorStats(data);
        editorStatus = 2;
      },
      onChange: async () => {
        editorStatus = 1;
        const data = await editor.save();
        scenes.setSceneContent(params.sceneId, data);
        editorStatus = 2;
        editorStats(data);
      },
      tools: {
        quote: {
          class: Quote,
          inlineToolbar: true,
        },
        heading: {
          class: Header,
          inlineToolbar: true,
        },
        paragraph: {
          class: Paragraph,
          inlineToolbar: ["bold", "italic"],
        },
      },
    });
  });

  onDestroy(() => {
    window.removeEventListener("hashchange", routeChange, false);
  });

  const routeChange = () => {
    if (editor) {
      editor.render(currentScene.content);
      document.querySelector(".content").scrollTo(0, 0);
    }
  };

  const switchScene = e => {
    push("/write/" + e.target.value);
    e.target.selectedIndex = 0;
  };

  const toggleFocus = () => {
    $ui.focus = !$ui.focus;
  };
</script>

<div in:fade={{ duration: 100 }}>
  {#if $state.currentProject}
    {#if params.sceneId !== null}
      <Modal bind:show={showCards}>
        <h2 slot="header">{$_('write.toolbar.cards')}</h2>
        {#each filteredCards as card}
          <div>
            <h2>{card.title}</h2>
            <p>{card.content}</p>
          </div>
        {:else}
          <p>
            <Placeholder>{$_('write.toolbar.cardsEmpty')}</Placeholder>
          </p>
        {/each}
      </Modal>
      <div class="toolbar">
        <div class="inner">
          <div>
            <span>{countWord} {$_('write.toolbar.words')}</span>
            <span>{countChar} {$_('write.toolbar.chars')}</span>
          </div>
          <div>
            {#if filteredCards.length > 0}
              <span
                transition:fade={{ duration: 100 }}
                class="lnr lnr-bookmark"
                use:tippy={{ content: $_('write.toolbar.cards'), placement: 'bottom' }}
                on:click={() => (showCards = true)} />
            {/if}
            {#if $ui.focus}
              <!-- svelte-ignore a11y-no-onchange -->
              <select
                id="focusSceneSelect"
                transition:fade={{ duration: 100 }}
                on:change={switchScene}
                class="lnr"
                use:tippy={{ content: $_('write.toolbar.switchScene'), placement: 'bottom' }}>
                <option value="" selected="selected">&#xe871;</option>
                {#each $chapters.filter(chapter => chapter.project == $state.currentProject) as chapter}
                  <optgroup label={chapter.title}>
                    {#each $scenes.filter(scene => scene.chapter == chapter.id) as scene}
                      <option value={scene.id}>{scene.title}</option>
                    {/each}
                  </optgroup>
                {/each}
              </select>
            {/if}
          </div>
          <div>
            <span
              class="lnr"
              use:tippy={{ content: $_('write.toolbar.focus'), placement: 'bottom' }}
              on:click={toggleFocus}
              class:lnr-eye={!$ui.focus}
              class:lnr-exit={$ui.focus} />
            <span
              class="lnr"
              use:tippy={{ content: $_('write.toolbar.savestate'), placement: 'bottom' }}
              class:lnr-sync={editorStatus === 1}
              class:spinner={editorStatus === 1}
              class:lnr-checkmark-circle={editorStatus === 2} />
          </div>
        </div>
      </div>
      <div class="editpane" style="--quotation-marks:{$_('write.quote.marks')}">
        <h1
          contenteditable
          bind:textContent={currentScene.title}
          on:input={titleInput} />
        <div bind:this={editorRef} />
        <!--
          <OmniaEditor
          bind:this={editor}
          bind:data={currentScene.content}
          spellCheck={$settings.spellCheck}
          translation={editorLanguage}
          on:init={init}
          on:input={() => (editorStatus = 1)}
          on:change={change} />
        -->
      </div>

      <Overview />
    {/if}
  {:else}
    <Placeholder />
  {/if}
</div>

<style lang="scss">
  * {
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0) !important;
    -webkit-focus-ring-color: rgba(255, 255, 255, 0) !important;
    outline: 0 !important;
  }

  .editpane {
    margin: 0 auto;
    max-width: 800px;
    margin-bottom: 50vh;

    @media (min-width: 1200px) {
      padding: 10px;
      box-shadow: 0 5px 26px 2px rgba(0, 0, 0, 0.2);
    }

    > h1 {
      font-family: "Libre Baskerville";
      text-align: center;
    }
  }

  :global(.cdx-block) {
    font-family: "Libre Baskerville";
    color: var(--editor-color);
    font-weight: 400;
    font-size: var(--editor-font-size);
  }

  :global(.cdx-block.ce-paragraph) {
    line-height: 2.5rem;
    text-align: justify;
  }

  select#focusSceneSelect {
    background-color: var(--select-background);
    font-weight: bold;
    width: 1.5rem;
    color: var(--text-color);
    text-align: center;
    -webkit-appearance: none;
    border: 0;
    cursor: pointer;

    &:focus,
    &:active {
      border: 0;
      outline: 0;
    }
  }

  .toolbar {
    position: sticky;
    position: -webkit-sticky;
    top: 0;
    background-color: var(--background-color);
    padding: 1rem;
    font-size: 1.5rem;
    margin-bottom: 2rem;
    z-index: 8;

    > .inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      align-content: center;
      margin: auto;
      max-width: 800px;

      > div {
        * {
          margin: 0 0.5rem;
          opacity: 0.65;
          cursor: pointer;
        }
        *:hover {
          opacity: 1;
        }
        span {
          font-size: 1rem;
        }
        .lnr {
          font-size: unset;

          &.spinner {
            display: inline-block;
            -webkit-animation: spin 2s infinite linear;
            animation: spin 2s infinite linear;
          }
          @keyframes spin {
            0% {
              -webkit-transform: rotate(0deg);
              transform: rotate(0deg);
            }

            100% {
              -webkit-transform: rotate(359deg);
              transform: rotate(359deg);
            }
          }
        }
      }
    }
  }
</style>
