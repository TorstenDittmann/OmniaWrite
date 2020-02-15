const copydir = require("copy-dir");
const fs = require("fs");

copydir("./public", "./mobile/www", {
  utimes: true,
  mode: false,
  cover: true
}, err => {
  if (err) throw err;
  fs.unlink("./mobile/www/index.html", err => {
    if (err) throw err;
    fs.rename("./mobile/www/index_phonegap.html", "./mobile/www/index.html", err => {
      if (err) throw err;
      console.log("Files copied to Phonegap folder!");
    });
  });
});
