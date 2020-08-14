<script>
  import { createEventDispatcher } from "svelte";
  import { fly } from "svelte/transition";
  import { link } from "svelte-spa-router";
  import {
    closeWindow,
    resizeWindow,
    minimizeWindow,
    isRunningElectron,
  } from "../bridge";
  import { state, ui } from "../stores";
  import { _ } from "svelte-i18n";

  import active from "svelte-spa-router/active";

  import cloud from "../appwrite";
  import Toast from "./Toast.svelte";
  import Backdrop from "./Sidebar/Backdrop.svelte";
  import Close from "./Sidebar/Close.svelte";
  import Tabs from "./Header/Tabs.svelte";
  import Spinner from "./Spinner.svelte";

  export let navigationState;

  const dispatch = createEventDispatcher();

  const cloudToast = {
    show: false,
    text: "",
  };

  let cloudState = "none";

  const syncCloud = () => {
    cloudState = "loading";
    cloud.saveToCloud().then(
      () => {
        cloudState = "done";
      },
      (error) => {
        cloudToast.text = error.message;
        cloudToast.show = true;
        cloudState = "upload";
      }
    );
  };

  $: {
    if ($state.isUserLoggedIn) {
      if (
        !$state.lastCloudSave ||
        $state.lastCloudSave < $state.lastLocalSave
      ) {
        cloudState = "upload";
      } else {
        cloudState = "done";
      }
    }
  }
</script>

<style lang="scss">
  @import "../css/mixins/devices";

  header {
    background-color: var(--primary-color);
    grid-area: header;
    text-align: center;
    -webkit-user-select: none;
    -webkit-app-region: drag;

    @include desktop {
      grid-area: header;
    }

    &.focus {
      display: none;
    }

    .burger {
      float: left;
      font-size: 1.5rem;
      height: 4rem;
      width: 4rem;
      border: 0;
      color: #fafafa;
      background: rgba(0, 0, 0, 0);

      @include desktop {
        display: none;
      }
    }

    .logo-mobile {
      @include desktop {
        display: none;
      }
      img {
        height: 4rem;
      }
    }

    nav.header {
      height: 4rem;

      .mobile {
        float: right;
        font-size: 1.5rem;
        height: 4rem;
        width: 4rem;
        border: 0;
        color: #fafafa;
        background: rgba(0, 0, 0, 0);

        @include desktop {
          display: none;
        }
      }
    }

    .navigation {
      height: 100vh;
      width: 100vw;
      position: absolute;
      z-index: 20;
      top: 0;

      @include desktop {
        display: block;
        visibility: initial;
        height: 4rem;
      }

      ul.menu {
        background-color: var(--primary-color);
        margin: 0;
        padding: 0;
        width: 70%;
        height: 100%;
        list-style-type: none;
        float: right;
        text-align: center;
        overflow-y: auto;

        @include desktop {
          background-color: unset;
          list-style-type: none;
          margin: 0;
          padding: 0;
          overflow: hidden;
          height: 4rem;
          float: left;
        }

        li {
          -webkit-app-region: no-drag;
          cursor: pointer;

          @include desktop {
            line-height: 4rem;
            float: left;

            & img {
              height: 4rem;
            }
          }

          a {
            color: var(--menu-link);
            font-size: 1rem;
            text-decoration: none;
            display: block;
            padding: 1.5rem 2rem;
            opacity: 0.65;

            @include desktop {
              display: block;
              text-align: center;
              text-decoration: none;
              padding: 0 1rem;
            }

            &:hover {
              opacity: 1;
            }
          }

          span {
            color: var(--menu-link);
            font-size: 1.5rem;
            text-decoration: none;
            display: block;
            padding: 1.5rem 1rem;
            opacity: 0.65;

            &:hover {
              opacity: 1;
            }
          }

          .lnr {
            padding: 1.25rem 1rem;
          }
        }
        :global(.active) {
          background: rgba(255, 255, 255, 0.15);

          :global(a) {
            opacity: 1;
          }
        }
      }

      .feedback {
        bottom: 0;
        left: 0;
        position: absolute;

        @include desktop {
          position: static;
        }
      }
    }
  }

  .titlebar {
    float: right;
    line-height: 4rem;
    font-size: 1.5rem;
    padding: 0 1rem;
    opacity: 0.65;
    cursor: pointer;
    color: var(--menu-link);
  }

  .titlebar:hover {
    opacity: 1;
  }
</style>

<header style="-webkit-app-region: drag" class:focus={$ui.focus}>
  <nav class="header noselect">
    <button
      class="burger"
      id="open-sidebar"
      on:click={() => dispatch("openSidebar")}
      style="-webkit-app-region: no-drag">
      <span class="lnr lnr-menu" />
    </button>
    <a
      class="logo-mobile"
      href="/"
      use:link
      style="-webkit-app-region: no-drag">
      <img src="logo.png" alt="OmniaWrite Logo" />
    </a>
    {#if navigationState}
      <div
        id="navigation"
        class="navigation"
        class:active={navigationState}
        in:fly={{ y: 200, duration: 200 }}
        out:fly={{ y: 200, duration: 200 }}>
        <ul class="menu">
          <Backdrop bind:state={navigationState} />
          <Close bind:state={navigationState} right={false} />
          <li use:active={"/"} style="-webkit-app-region: no-drag">
            <a href="/" use:link>
              <img src="logo.png" alt="OmniaWrite Logo" />
            </a>
          </li>
          <li use:active={"/write/*"} style="-webkit-app-region: no-drag">
            <a href="/write/" use:link>{$_("header.write.title")}</a>
          </li>
          <li use:active={"/cards/"} style="-webkit-app-region: no-drag">
            <a href="/cards/" use:link>{$_("header.cards.title")}</a>
          </li>
          <li use:active={"/settings"} style="-webkit-app-region: no-drag">
            <a href="/settings" use:link>{$_("header.settings.title")}</a>
          </li>
          <li use:active={"/export"} style="-webkit-app-region: no-drag">
            <a href="/export" use:link>{$_("header.export.title")}</a>
          </li>
          <li use:active={"/cloud"} style="-webkit-app-region: no-drag">
            <a href="/cloud" use:link>{$_("header.cloud.title")}</a>
          </li>
          {#if cloudState === "upload"}
            <li on:click={syncCloud} style="-webkit-app-region: no-drag">
              <span class="lnr lnr-cloud-upload" />
            </li>
          {:else if cloudState === "done"}
            <li>
              <span class="lnr lnr-cloud-check" />
            </li>
          {:else if cloudState === "loading"}
            <li>
              <Spinner />
            </li>
          {/if}
        </ul>
        {#if isRunningElectron}
          <span
            class="lnr lnr-cross titlebar"
            on:click={closeWindow}
            style="-webkit-app-region: no-drag" />
          <span
            class="lnr lnr-frame-expand titlebar"
            on:click={resizeWindow}
            style="-webkit-app-region: no-drag" />
          <span
            class="lnr lnr-chevron-down titlebar"
            on:click={minimizeWindow}
            style="-webkit-app-region: no-drag" />
        {/if}
        <span
          class="lnr lnr-question-circle titlebar feedback"
          style="-webkit-app-region: no-drag"
          on:click={() => ($ui.support.show = true)} />
      </div>
    {/if}
    <button
      class="mobile"
      id="open-navigation"
      on:click={() => (navigationState = true)}
      style="-webkit-app-region: no-drag">
      <span class="lnr lnr-book" />
    </button>
  </nav>
  <Tabs />
</header>
<Toast
  bind:show={cloudToast.show}
  text={cloudToast.text}
  on:click={() => (cloudToast.show = false)} />
