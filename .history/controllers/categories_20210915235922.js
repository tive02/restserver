const { response } = require("express");
const { Category } = require("../models");

//Obtener Categoria- paginado - total -populate

//Obtener categoria populate

//crear categoria
const createCategory = async (req, res = response) => {
  const name = req.body.name.toUpperCase();

  const categoryDB = await Category.findOne({ name });

  if (categoryDB) {
    return res.status(400).json({
      msg: `La categoria ${categoryDB.name}, ya existe`,
    });
  }

  // Generar la data a guardar
  const data = {
    name,
    user: req.user._id,
  };

  const category = new Category(data);

  // Guardar DB
  await category.save();

  res.status(201).json(category);
};

//Actualizar categoria

//Borrar categoria - estadofalse

module.exports = {
  createCategory,
};
