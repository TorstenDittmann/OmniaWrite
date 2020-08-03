<script>
  import { fade } from "svelte/transition";
  import { _ } from "svelte-i18n";
  import { state } from "../../stores";
  import saveAs from "file-saver";
  import { Button, ButtonGroup } from "../../components/Forms";
  import Placeholder from "../../shared/Placeholder.svelte";
  import Export from "./RTF/collectData";

  const download = async () => {
    let generateDownload = new Export($state.currentProject);
    const data = await generateDownload.fetchData();
    const blob = new Blob([data.document], {
      type: "text/plain",
    });
    saveAs.saveAs(blob, data.filename);
  };
</script>

<div in:fade={{ duration: 100 }}>
  <p>{$_('export.rtf.explain')}</p>
  <ButtonGroup>
    <Button on:click={download}>{$_('export.action.export')}</Button>
  </ButtonGroup>
</div>
