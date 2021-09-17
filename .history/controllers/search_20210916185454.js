const { request, response } = require("express");
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

  res.json({
    collection,
    word,
  });
};

module.exports = {
  search,
};
