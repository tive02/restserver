const { response } = require("express");
const { uploadFile } = require("../helpers");

const loadFiles = async (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.records) {
    res.status(400).json("No hay archivos que subir.");
    return;
  }

  try {
    // txt, md
    const name = await uploadFile(req.files, ["txt", "md"], "texts");
    //const name = await uploadFile( req.files, undefined, 'imgs' );
    res.json({ name });
  } catch (msg) {
    res.status(400).json({ msg });
  }
};

module.exports = {
  loadFiles,
};
