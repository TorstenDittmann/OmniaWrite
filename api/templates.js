module.exports = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  const templates = [
    {
      id: "epub3",
      name: "Simple",
    },
    {
      id: "modern",
      name: "Modern",
    },
    {
      id: "scifi",
      name: "Science Fiction",
    },
  ];
  res.json(templates)
}