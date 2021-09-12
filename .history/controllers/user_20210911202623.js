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
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });
  //validar correo
  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);
  //add a BD
  await user.save();

  res.json({ user });
};

const usersPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, email, ...rest } = req.body;

  if (password) {
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  }

  const user = await UserfindByIdAndUpdate(id, rest);

  res.json(user);
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
