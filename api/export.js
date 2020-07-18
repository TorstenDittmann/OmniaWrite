module.exports = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Headers", "*")
  res.setHeader("Access-Control-Expose-Headers", "*")
  res.setHeader("Access-Control-Allow-Methods", "POST")

  if (req.method === "OPTIONS") {
    return res.status(200).send("ok");
  }
  const EBook = require("omnia-ebook-generator");
  const ebook = new EBook(
    {
      cover: req.body.cover,
      title: req.body.title,
      description: req.body.description,
      publisher: req.body.publisher,
      author: req.body.author,
      lang: req.body.lang
    },
    req.body.data);

  ebook.render({ use: req.body.template });
  ebook.base64().then(data => {
    res.setHeader("Content-Disposition", `attachment; filename="${ebook.options.title}.epub"`)
    res.setHeader("Content-Type", "application/epub+zip")
    res.send(Buffer.from(data, "base64"))
  });
}