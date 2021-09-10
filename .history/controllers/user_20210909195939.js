const { response } = require("express");

const usersGet = (req, res = response) => {
  res.json({ msg: "get api-Controlador" });
};

const usersPost = (req, res = response) => {
  const { nombre, edad } = req.body;

  res.json({ msg: "Post api-Controlador", nombre, edad });
};

const usersPut = (req, res = response) => {
  res.json({ msg: "Put api-Controlador" });
};

const usersDelete = (req, res = response) => {
  res.json({ msg: "Delete api-Controlador" });
};

const usersPatch = (req, res = response) => {
  res.json({ msg: "Patch api-Controlador" });
};

module.exports = {
  usersGet,
  usersPost,
  usersPut,
  usersDelete,
  usersPatch,
};
