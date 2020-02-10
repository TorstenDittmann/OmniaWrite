<script>
  import licenses from "../licenses.json";

  let licenseData = [];

  Object.keys(licenses).forEach((key, index) => {
    licenseData.push({
      name: key,
      copyright: licenses[key].copyright,
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
    <p>{item.name}</p>
    <small>{item.copyright}</small>
    <br />
    <small>{item.license}</small>
    <br />
    <small>{item.text}</small>
    <br />
  {/each}
</div>
