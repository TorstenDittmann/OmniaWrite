<script>
  import licenses from "../licenses.json";

  let licenseData = [];

  Object.keys(licenses).forEach((key, index) => {
    licenseData.push({
      name: key,
      license: licenses[key].licenses,
      text: licenses[key].licenseText
    });
  });
</script>

<style>
  .licenses {
    max-width: 800px;
  }
</style>

<div class="licenses">
  {#each licenseData as item}
    <b>{item.name}</b>
    <br />
    <small>{item.license}</small>
    <br />
    <small>{item.text}</small>
    <hr />
  {/each}
</div>
