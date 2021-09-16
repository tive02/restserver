const { Router } = require("express");
const { check } = require("express-validator");
const { existeCategoriaPorId } = require("../../curso-node-restserver-4.0.0/helpers/db-validators");
const {
  getCategories,
  getCategoriesForID,
  createCategory,
} = require("../controllers/categories");

const { validateFields, validateJWT } = require("../middlewares");

const router = Router();
//Obtener todas las categorias publicas
router.get("/", getCategories);

//Obtener una categoria por id - publicas
router.get(
  "/:id",
  [check("id", "No es un id de Mongo válido").isMongoId(), check("id").custom(existeCategoriaPorId) validateFields],
  getCategoriesForID
);

//Crear categoria - privada - cualquier persona con un token valido
router.post(
  "/",
  [
    validateJWT,
    check("name", "El nombre es obligatorio").not().isEmpty(),
    validateFields,
  ],
  createCategory
);

//Actualizar unacategoria por id - publicas
router.put("/:id", (req, res) => {
  res.json("put id");
});

//Borrar una categoria por id - ADMIN
router.delete("/:id", (req, res) => {
  res.json("Delete id");
});

module.exports = router;
