const { response, request } = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header("Authorization");
  //Si no existe el token en la peticion
  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la petición",
    });
  }
  //Saber si es un token valido
  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    console.log(uid);
    // leer el usuario que corresponde al uid
    //const user = await User.findById(uid);

    //if (!user) {
    //  return res.status(401).json({
    //    msg: "Token no válido - usuario no existe DB",
    //  });
    //}

    // Verificar si el uid tiene estado true
    //if (!user.state) {
    //  return res.status(401).json({
    //    msg: "Token no válido - usuario con estado: false",
    //  });
    //}

    //req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token no válido",
    });
  }
};

module.exports = {
  validateJWT,
};
