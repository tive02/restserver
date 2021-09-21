const { response } = require("express");

const validateFileSubmit = (req, res = response, next) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.records) {
    return res.status(400).json({
      msg: "No hay archivos que subir - validarArchivoSubir",
    });
  }

  next();
};

module.exports = {
  validateFileSubmit,
};
