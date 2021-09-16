const { request, response } = require("express");

const search = (req = request, res = response) => {
  res.json({
    msg: "Buscar ok",
  });
};

module.exports = {
  search,
};
