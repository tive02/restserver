const { response, request } = require("express");

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
  const { nombre, edad } = req.body;

  res.json({ msg: "Post api-Controlador", nombre, edad });
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
