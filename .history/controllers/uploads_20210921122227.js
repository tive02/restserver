const { response } = require("express");
const { uploadFile } = require("../helpers");

const loadFiles = async (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.records) {
    res.status(400).json("No hay archivos que subir.");
    return;
  }

  try {
    // txt, md
    //const name = await uploadFile(req.files, ["txt", "md"], "texts");
    const name = await uploadFile(req.files, undefined, "imgs");
    res.json({ name });
  } catch (msg) {
    res.status(400).json({ msg });
  }
};

const updateImage = async (req, res = response) => {
  const { id, collection } = req.params;

  let model;

  switch (collection) {
    case "users":
      model = await User.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`,
        });
      }

      break;

    case "products":
      model = await Product.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `No existe un producto con el id ${id}`,
        });
      }

      break;

    default:
      return res.status(500).json({ msg: "Se me olvidó validar esto" });
  }

  // Limpiar imágenes previas
  if (model.img) {
    // Hay que borrar la imagen del servidor
    const pathImagen = path.join(
      __dirname,
      "../uploads",
      collection,
      model.img
    );
    if (fs.existsSync(pathImagen)) {
      fs.unlinkSync(pathImagen);
    }
  }

  const name = await loadFiles(req.files, undefined, collection);
  model.img = name;

  await model.save();

  res.json(model);
};

module.exports = {
  loadFiles,
  updateImage,
};
