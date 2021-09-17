const { request, response } = require("express");
const { ObjectId } = require("mongoose").Types;
const { User, Category, Product } = require("../models");

const allowebCollection = ["users", "categories", "products", "roles"];

//Buscar usuarios
const searchUser = async (word = "", res = response) => {
  const isMongoID = ObjectId.isValid(word); // TRUE

  if (isMongoID) {
    const user = await User.findById(word);
    return res.json({
      results: user ? [user] : [],
    });
  }

  const regex = new RegExp(word, "i");
  const users = await User.find({
    $or: [{ name: regex }, { email: regex }],
    $and: [{ state: true }],
  });

  res.json({
    results: users,
  });
};

const searchCategory = async (word = "", res = response) => {
  const isMongoID = ObjectId.isValid(word); // TRUE

  if (isMongoID) {
    const category = await Category.findById(word);
    return res.json({
      results: category ? [category] : [],
    });
  }

  const regex = new RegExp(word, "i");
  const categories = await Category.find({ name: regex, state: true });

  res.json({
    results: categories,
  });
};

const buscarProductos = async (termino = "", res = response) => {
  const esMongoID = ObjectId.isValid(termino); // TRUE

  if (esMongoID) {
    const producto = await Producto.findById(termino).populate(
      "categoria",
      "nombre"
    );
    return res.json({
      results: producto ? [producto] : [],
    });
  }

  const regex = new RegExp(termino, "i");
  const productos = await Producto.find({
    nombre: regex,
    estado: true,
  }).populate("categoria", "nombre");

  res.json({
    results: productos,
  });
};
//Busqueda por coleccion que es exportada
const search = (req = request, res = response) => {
  const { collection, word } = req.params;

  if (!allowebCollection.includes(collection)) {
    return res.status(400).json({
      msg: `Las colecciones permitidas son: ${allowebCollection}`,
    });
  }

  switch (collection) {
    case "users":
      searchUser(word, res);
      break;
    case "categories":
      searchCategory(word, res);
      break;
    case "products":
      buscarProductos(word, res);
      break;

    default:
      res.status(500).json({
        msg: "Se le olvido hacer esta búsquda",
      });
  }
};

module.exports = {
  search,
};
