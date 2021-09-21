const { response } = require("express");

const loadFiles = (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.records) {
    res.status(400).json("No hay archivos que subir.");
    return;
  }
};

module.exports = {
  loadFiles,
};
