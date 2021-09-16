const { Router } = require("express");
const { check } = require("express-validator");
const {
  getCategories,
  getCategoriesForID,
  createCategory,
  upgradeCategory,
  deleteCategory,
} = require("../controllers/categories");
const { existsCategoryForId } = require("../helpers/db-validators");

const { validateFields, validateJWT, isAdminRole } = require("../middlewares");

const router = Router();
//Obtener todas las categorias publicas
router.get("/", getCategories);

//Obtener una categoria por id - publicas
router.get(
  "/:id",
  [
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom(existsCategoryForId),
    validateFields,
  ],
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
router.put(
  "/:id",
  [
    validateJWT,
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom(existsCategoryForId),
    validateFields,
  ],
  upgradeCategory
);

//Borrar una categoria por id - ADMIN
router.delete(
  "/:id",
  [
    validateJWT,
    isAdminRole,
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom(existsCategoryForId),
    validateFields,
  ],
  deleteCategory
);

module.exports = router;
