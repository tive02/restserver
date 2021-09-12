const { response, request } = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");

const usersGet = (req = request, res = response) => {
  const { q, name = "not name", apikey, page = 1, limit } = req.query;
  res.json({
    msg: "get api-Controlador",
    q,
    name,
    apikey,
    page,
    limit,
  });
};

const usersPost = async (req, res = response) => {
  const { nombre, correo, password, rol } = req.body;
  const user = new User({ nombre, correo, password, rol });
  //add a BD
  await user.save();
  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  res.json({ user });
};

const usersPut = (req, res = response) => {
  const id = req.params.id;
  res.json({ msg: "Put api-Controlador", id });
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
