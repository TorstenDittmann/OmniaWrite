<script>
  import cloud from "../../appwrite";

  import Name from "./Profile/Name.svelte";
  import Email from "./Profile/Email.svelte";
  import Password from "./Profile/Password.svelte";

  import Spinner from "../../shared/Spinner.svelte";
</script>

{#await cloud.getUser()}
  <Spinner />
{:then user}
  <Name {...user} />
  <Email {...user} />
  <Password />
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}
