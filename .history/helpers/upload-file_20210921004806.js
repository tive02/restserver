const uploadFile = () => {
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  const { records } = req.files;
  const nameShort = records.name.split(".");
  const extension = nameShort[nameShort.length - 1];

  //Validar la extencion.
  const extensionsValidate = ["png", "jpg", "jpeg", "gif"];
  if (!extensionsValidate.includes(extension)) {
    return res.status(400).json({
      msg: `La extension ${extension} no es permitida, ${extensionsValidate}`,
    });
  }

  const nameTemp = uuidv4() + "." + extension;

  const uploadPath = path.join(__dirname, "../uploads/", nameTemp);

  // Use the mv() method to place the file somewhere on your server
  records.mv(uploadPath, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    res.json({ msg: "File uploaded! to" + uploadPath });
  });
};

module.exports = {
  uploadFile,
};
