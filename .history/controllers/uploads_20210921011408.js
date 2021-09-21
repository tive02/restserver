const { response } = require("express");
const { uploadFile } = require("../helpers");

const loadFiles = async (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.records) {
    res.status(400).json("No hay archivos que subir.");
    return;
  }

  //Imagenes
  const pathComplete = await uploadFile(req.files);

  res.json({
    path: pathComplete,
  });
};

module.exports = {
  loadFiles,
};
