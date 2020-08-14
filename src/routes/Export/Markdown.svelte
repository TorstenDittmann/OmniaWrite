<script>
  import { fade } from "svelte/transition";
  import { _ } from "svelte-i18n";
  import { state } from "../../stores";
  import { Button, ButtonGroup } from "../../components/Forms";
  import exportMarkdown from "./Markdown/collectData";
  import { saveFile } from "../../bridge";
  import Done from "./Shared/Done.svelte";
  import Spinner from "../../shared/Spinner.svelte";

  let done = false;
  let progress = false;
  let file;

  const download = async () => {
    progress = true;
    const data = await exportMarkdown($state.currentProject);
    const blob = new Blob([data.document], {
      type: "text/plain",
    });
    file = await saveFile(blob, data.filename);
    done = true;
  };
</script>

<div in:fade={{ duration: 100 }}>
  {#if done}
    <Done {file} />
  {:else if progress}
    <Spinner />
  {:else}
    <p>{$_("export.markdown.explain")}</p>
    <ButtonGroup>
      <Button on:click={download}>{$_("export.action.export")}</Button>
    </ButtonGroup>
  {/if}
</div>
