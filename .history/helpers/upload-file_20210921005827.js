const path = require("path");
const { v4: uuidv4 } = require("uuid");

const uploadFile = (
  files,
  extensionsValidate = ["png", "jpg", "jpeg", "gif"],
  folder = ""
) => {
  return new Promise((resolve, reject) => {
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    const { records } = files;
    const nameShort = records.name.split(".");
    const extension = nameShort[nameShort.length - 1];

    if (!extensionsValidate.includes(extension)) {
      return reject(
        `La extensión ${extension} no es permitida - ${extensionsValidate}`
      );
    }

    const nameTemp = uuidv4() + "." + extension;

    const uploadPath = path.join(__dirname, "../uploads/", folder, nameTemp);

    // Use the mv() method to place the file somewhere on your server
    records.mv(uploadPath, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      res.json({ msg: "File uploaded! to" + uploadPath });
    });
  });
};

module.exports = {
  uploadFile,
};
