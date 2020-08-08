<script>
  import { fade } from "svelte/transition";
  import { _ } from "svelte-i18n";
  import { state } from "../../stores";
  import saveAs from "file-saver";
  import { Button, ButtonGroup } from "../../components/Forms";
  import Placeholder from "../../shared/Placeholder.svelte";
  import Export from "./RTF/collectData";
  import { saveFile } from "../../bridge";

  let done = false;
  let uri;

  const download = async () => {
    let generateDownload = new Export($state.currentProject);
    const data = await generateDownload.fetchData();
    const blob = new Blob([data.document], {
      type: "text/plain",
    });
    saveFile(blob, data.filename).then((e) => {
      switch (e.type) {
        case "download":
          e.download();
          break;

        case "filesystem":
          uri = e.uri;
          done = true;
          break;
      }
    });
  };
</script>

<div in:fade={{ duration: 100 }}>
  {#if done}
    <b>Saved to:</b>
    {uri}
  {:else}
    <p>{$_('export.rtf.explain')}</p>
    <ButtonGroup>
      <Button on:click={download}>{$_('export.action.export')}</Button>
    </ButtonGroup>
  {/if}
</div>
