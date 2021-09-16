const { response, request } = require("express");
const { Category } = require("../models");

//Obtener Categoria- paginado - total -populate
const getCategories = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { state: true };

  const [total, categories] = await Promise.all([
    Category.countDocuments(query),
    Category.find(query)
      .populate("user", "name")
      .skip(Number(from))
      .limit(Number(limit)),
  ]);

  res.json({
    total,
    categories,
  });
};

//Obtener una categoria populate

const getCategoriesForID = async (req = request, res = response) => {
  const { id } = req.params;
  const category = await Category.findById(id).populate("user", "name");

  res.json(category);
};

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

const upgradeCategory = async (req = request, res = response) => {
  const { id } = req.params;
  const { state, user, ...rest } = req.body;

  data.name = data.name.toUpperCase();
  data.user = req.user._id;

  const category = await Category.findByIdAndUpdate(id, data, { new: true });

  res.json(category);
};

//Borrar categoria - estadofalse
const deleteCategory = async (req, res = response) => {
  const { id } = req.params;
  const categoryDelete = await Category.findByIdAndUpdate(
    id,
    { state: false },
    { new: true }
  );

  res.json(categoryDelete);
};

module.exports = {
  getCategories,
  getCategoriesForID,
  createCategory,
  upgradeCategory,
  deleteCategory,
};
