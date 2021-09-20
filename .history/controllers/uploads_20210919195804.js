const { response } = require("express");
const { path } = require("path");

const loadFiles = (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.records) {
    return res.status(400).json("No hay archivos que subir.");
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  const { records } = req.files;
  uploadPath = path.join(__dirname + "../uploads/" + records.name);

  // Use the mv() method to place the file somewhere on your server
  records.mv(uploadPath, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    res.json({ mdg: "File uploaded! to" + uploadPath });
  });
};

module.exports = {
  loadFiles,
};
