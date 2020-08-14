<script>
  import { fade } from "svelte/transition";
  import { _ } from "svelte-i18n";
  import { state } from "../../stores";
  import { Button, ButtonGroup } from "../../components/Forms";
  import Export from "./RTF/collectData";
  import { saveFile } from "../../bridge";
  import Done from "./Shared/Done.svelte";
  import Spinner from "../../shared/Spinner.svelte";

  let done = false;
  let progress = false;
  let file;

  const download = async () => {
    progress = true;
    let generateDownload = new Export($state.currentProject);
    const data = await generateDownload.fetchData();
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
    <p>{$_('export.rtf.explain')}</p>
    <ButtonGroup>
      <Button on:click={download}>{$_('export.action.export')}</Button>
    </ButtonGroup>
  {/if}
</div>
