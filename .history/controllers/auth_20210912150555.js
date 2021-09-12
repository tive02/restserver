const { response } = require("express");
const User = require("../models/user");

const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    //Verificar si el email existe
    const user = await User.findOne({ email });
    //verificar si el usuario esta activo

    //verificar la contraseña

    //Generar el JWT

    res.json({ msg: "login ok" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  login,
};
