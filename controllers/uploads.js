const { response } = require("express");

const loadFiles = (req, res = response) => {
  res.json({ msg: "Hola desde uploads" });
};

module.exports = {
  loadFiles,
};
