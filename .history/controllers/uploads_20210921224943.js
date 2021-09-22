const path = require("path");
const fs = require("fs");

const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const { response } = require("express");
const { uploadFile } = require("../helpers");
const { User, Product } = require("../models");

const loadFiles = async (req, res = response) => {
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
  try {
    if (model.img) {
      // Hay que borrar la imagen del servidor
      const pathImage = path.join(
        __dirname,
        "../uploads",
        collection,
        model.img
      );
      if (fs.existsSync(pathImage)) {
        fs.unlinkSync(pathImage);
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: `Algo salio mal ${error}` });
  }

  const name = await uploadFile(req.files, undefined, collection);
  model.img = name;

  await model.save();

  res.json(model);
};

const updateImageCloudinary = async (req, res = response) => {
  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`,
        });
      }

      break;

    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un producto con el id ${id}`,
        });
      }

      break;

    default:
      return res.status(500).json({ msg: "Se me olvidó validar esto" });
  }

  // Limpiar imágenes previas
  if (modelo.img) {
    const nombreArr = modelo.img.split("/");
    const nombre = nombreArr[nombreArr.length - 1];
    const [public_id] = nombre.split(".");
    cloudinary.uploader.destroy(public_id);
  }

  const { tempFilePath } = req.files.archivo;
  const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
  modelo.img = secure_url;

  await modelo.save();

  res.json(modelo);
};
const getImage = async (req, res = response) => {
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
  try {
    if (model.img) {
      // Hay que borrar la imagen del servidor
      const pathImage = path.join(
        __dirname,
        "../uploads",
        collection,
        model.img
      );
      if (fs.existsSync(pathImage)) {
        return res.sendFile(pathImage);
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: `Algo salio mal ${error}` });
  }

  const pathImage = path.join(__dirname, "../assets/no-image.jpg");
  res.sendFile(pathImage);
};

module.exports = {
  loadFiles,
  updateImage,
  updateImageCloudinary,
  getImage,
};
