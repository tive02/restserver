const { request, response } = require("express");
const mongoose = require("mongoose");
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

//Buscar productos
const searchProducts = async (word = "", res = response) => {
  const isMongoID = ObjectId.isValid(word); // TRUE

  if (isMongoID) {
    const product = await Product.findById(word).populate("category", "name");

    return res.json({
      results: product ? [product] : [],
    });
  }

  const regex = new RegExp(word, "i");
  const products = await Product.find({
    name: regex,
    state: true,
  }).populate("category", "name");

  res.json({
    results: products,
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
      searchProducts(word, res);
      break;

    default:
      res.status(500).json({
        msg: "Se le olvido hacer esta búsquda",
      });
  }
};
const searchProductsForCategory = async (req = request, res = response) => {
  const { category } = req.params;
  const isMongoID = ObjectId.isValid(category); // TRUE
  const id = mongoose.Types.ObjectId(category);

  if (isMongoID) {
    const products = await Product.find({
      category: id,
    });

    return res.json({
      results: products ? [products] : [],
    });
  }

  const regex = new RegExp(category, "i");
  const products = await Product.find({
    name: regex,
    state: true,
  }).populate("category", "name");

  res.json({
    results: products,
  });
};

module.exports = {
  search,
  searchProductsForCategory,
};
