const { response } = require("express");

const login = (req, res = response) => {
  const { email, password } = req.body;
  try {
  } catch (error) {
    return res.json({
      msg: "algo salio mal",
    });
  }
  res.json({ msg: "login ok" });
};

module.exports = {
  login,
};
