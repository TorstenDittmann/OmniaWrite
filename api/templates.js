module.exports = (req, res) => {
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