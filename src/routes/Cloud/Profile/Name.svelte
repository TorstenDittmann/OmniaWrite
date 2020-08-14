<script>
  import { _ } from "svelte-i18n";

  import cloud from "../../../appwrite";
  import Toast from "../../../shared/Toast.svelte";

  import { Input, Button, ButtonGroup } from "../../../components/Forms";

  export let name;

  let showToast = false;
  let textToast = "";
  let loading = false;

  const updateName = () => {
    loading = true;
    cloud.updateName(name).then(
      () => {
        loading = false;
        [showToast, textToast] = [true, $_("cloud.profile.name.success")];
      },
      () => {
        loading = false;
        [showToast, textToast] = [true, $_("cloud.profile.error")];
      }
    );
  };
</script>

<h2>{$_('cloud.profile.name.title')}</h2>

<form on:submit|preventDefault={updateName}>
  <Input
    label={$_('cloud.profile.name.fields.name')}
    placeholder="John Doe"
    bind:value={name} />
  <ButtonGroup>
    <Button on:click={updateName} {loading}>
      {$_('cloud.profile.action')}
    </Button>
  </ButtonGroup>
</form>

<Toast bind:show={showToast} text={textToast} />
