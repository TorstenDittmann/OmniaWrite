<script>
  import { onMount } from "svelte";

  let licenses = import('../licenses.json').then(lic => {
    let licenseData = [];
    Object.keys(lic).forEach((key, index) => {
      licenseData.push({
        name: key,
        license: lic[key].licenses,
        text: lic[key].licenseText
      });
    });
    return licenseData;
  });
</script>

<style>
  .licenses {
    max-width: 800px;
  }
</style>

<div class="licenses">
{#await licenses}
loading
{:then licenseData}

  {#each licenseData as item}
    <b>{item.name}</b>
    <br />
    <small>{item.license}</small>
    <br />
    <small>{item.text}</small>
    <hr />
  {/each}
  {/await}

</div>
