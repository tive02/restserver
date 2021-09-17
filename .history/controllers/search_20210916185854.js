const { request, response } = require("express");
const { ObjectId } = require("mongoose").Types;
const { User, Category, Product } = require("../models");

const allowebCollection = ["users", "categories", "products", "roles"];

const searchUser = async (word = "", res = response) => {
  const isMongoID = ObjectId.isValid(word); // TRUE

  if (isMongoID) {
    const user = await User.findById(word);
    return res.json({
      results: user ? [user] : [],
    });
  }
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
      //buscarCategorias(word, res);
      break;
    case "products":
      // buscarProductos(word, res);
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
