const { request, response } = require("express");

const search = (req = request, res = response) => {
  const { collection, word } = req.params;
  res.json({
    collection,
    word,
  });
};

module.exports = {
  search,
};
