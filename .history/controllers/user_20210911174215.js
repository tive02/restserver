const { response, request } = require("express");
const User = require("../models/user");

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

const usersPost = (req, res = response) => {
  const body = req.body;
  const user = new User(body);

  user.save();

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
