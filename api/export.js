module.exports = (req, res) => {
  const EBook = require("@torstendittmann/ebook-generator");
  const ebook = new EBook({ cover: req.body.cover }, req.body.data);

  ebook.render({ use: "epub3" });
  ebook.base64().then(data => {
    res.setHeader("Content-Disposition", `attachment; filename="${ebook.options.title}.epub"`)
    res.setHeader("Content-Type", "application/epub+zip")
    res.send(Buffer.from(data, "base64"))
  });
}