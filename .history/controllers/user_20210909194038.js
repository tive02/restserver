const { response } = require("express");

const usersGet = (req, res = response) => {
  res.json({ msg: "get api-Controlador" });
};

module.exports = {
  usersGet,
};
