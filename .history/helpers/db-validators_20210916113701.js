const { Category, Role, User } = require("../models");

/* ***Roles del usuario */

const isValidRole = async (role = "") => {
  const roleExists = await Role.findOne({ role });
  if (!roleExists) {
    throw new Error(`El rol ${role} no está registrado en la BD`);
  }
};

/* ***Existencia del email del usuario */
const emailExists = async (email = "") => {
  // Verificar si el email existe
  const existEmail = await User.findOne({ email });
  if (existEmail) {
    throw new Error(`El email: ${email}, ya está registrado`);
  }
};

// Verificar si el usuario existe
const existsUserForId = async (id) => {
  const existsUser = await User.findById(id);
  if (!existsUser) {
    throw new Error(`El id no existe ${id}`);
  }
};

/*
Categorias 
*/
const existsCategoryForId = async (id) => {
  // Verificar si el usuario existe
  const existsCategory = await Category.findById(id);
  if (!existsCategory) {
    throw new Error(`La categoria no existe`);
  }
};

module.exports = {
  isValidRole,
  emailExists,
  existsUserForId,
  existsCategoryForId,
};
