const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");
const { generateJWT } = require("../helpers/generate-jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    //Verificar si el email existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - correo",
      });
    }

    //verificar si el usuario esta activo
    if (!user.state) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - estado: false",
      });
    }
    //verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - password",
      });
    }

    //Generar el JWT

    const token = await generateJWT(user.id);

    res.json({ user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

const googleSignin = async (req = request, res = response) => {
  const { id_token } = req.body;
  try {
    const googleUSer = await googleVerify(id_token);
    console.log(googleUSer);
    //const { email, name, img } = await googleVerify(id_token);
    //
    //    let usuario = await Usuario.findOne({ correo });
    //
    //    if (!usuario) {
    //      // Tengo que crearlo
    //      const data = {
    //        nombre,
    //        correo,
    //        password: ":P",
    //        img,
    //        google: true,
    //      };
    //
    //      usuario = new Usuario(data);
    //      await usuario.save();
    //    }
    //
    //    // Si el usuario en DB
    //    if (!usuario.estado) {
    //      return res.status(401).json({
    //        msg: "Hable con el administrador, usuario bloqueado",
    //      });
    //    }
    //
    //    // Generar el JWT
    //    const token = await generarJWT(usuario.id);
    //
    //    //res.json({
    //    usuario,
    //    token
    //});
    res.json({
      msg: "Todo esta OK- google sign in",
      googleUSer,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Token de Google no es válido",
    });
  }
};

module.exports = {
  login,
  googleSignin,
};
