const { request, response } = require("express");

const allowebCollection = ["users", "categories", "products", "roles"];
const search = (req = request, res = response) => {
  const { collection, word } = req.params;

  if (!allowebCollection.includes(collection)) {
    return res.status(400).json({
      msg: `Las colecciones permitidas son: ${allowebCollection}`,
    });
  }

  res.json({
    collection,
    word,
  });
};

module.exports = {
  search,
};
