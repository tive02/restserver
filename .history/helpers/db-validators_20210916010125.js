const Role = require("../models/role");
const User = require("../models/user");

const isValidRole = async (role = "") => {
  const roleExists = await Role.findOne({ role });
  if (!roleExists) {
    throw new Error(`El rol ${role} no está registrado en la BD`);
  }
};

const emailExists = async (email = "") => {
  // Verificar si el email existe
  const existEmail = await User.findOne({ email });
  if (existEmail) {
    throw new Error(`El email: ${email}, ya está registrado`);
  }
};

const existsUserForId = async (id) => {
  // Verificar si el usuario existe
  const existsUser = await User.findById(id);
  if (!existsUser) {
    throw new Error(`El id no existe ${id}`);
  }
};

//Categorias
const existsCategoryrForId = async (id) => {
  // Verificar si el usuario existe
  const existsUser = await User.findById(id);
  if (!existsUser) {
    throw new Error(`El id no existe ${id}`);
  }
};

module.exports = {
  isValidRole,
  emailExists,
  existsUserForId,
  existsCategoryrForId,
};
