const { response } = require("express");

const login = (req, res = response) => {
  const { email, password } = req.body;
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
  res.json({ msg: "login ok" });
};

module.exports = {
  login,
};
