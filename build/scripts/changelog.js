const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
const pkg = require("../../package.json");

const version = pkg.version;
const tag = `v${version}`;
const url = `https://api.github.com/repos/torstendittmann/omniawrite/releases/tags/${tag}`;

const getChangelog = async () => {
  const response = await fetch(url);
  if (!response.ok) {
    createChangelog({
      changes: false
    });
    return;
  }
  const release = await response.json();
  createChangelog({
    changes: true,
    name: release.name,
    body: release.body
  })
};

const createChangelog = changelog => {
  const data = JSON.stringify(changelog);
  const file = path.resolve("src", "changelog.json");
  fs.writeFileSync(file, data);
};

getChangelog();