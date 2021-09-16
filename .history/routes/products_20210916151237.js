const { Router } = require("express");
const { check } = require("express-validator");

const { validateFields, validateJWT, isAdminRole } = require("../middlewares");

const {
  createProduct,
  getProducts,
  getProductForID,
  updateProduct,
  deleteProduct,
} = require("../controllers/products");

const {
  existsCategoryForId,
  existsProductForId,
} = require("../helpers/db-validators");

const router = Router();

/**
 * {{url}}/api/products
 */

//  Obtener todas las categorias - publico
router.get("/", getProducts);

// Obtener una categoria por id - publico
router.get(
  "/:id",
  [
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom(existsProductForId),
    validateFields,
  ],
  getProductForID
);

// Crear categoria - privado - cualquier persona con un token válido
router.post(
  "/",
  [
    validateJWT,
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("category", "No es un id de Mongo").isMongoId(),
    check("category").custom(existsCategoryForId),
    validateFields,
  ],
  createProduct
);

// Actualizar - privado - cualquiera con token válido
router.put(
  "/:id",
  [
    validateJWT,
    check("category", "No es un id de Mongo").isMongoId(),
    check("id").custom(existsProductForId),
    validateFields,
  ],
  updateProduct
);

// Borrar una categoria - Admin
router.delete(
  "/:id",
  [
    validateJWT,
    isAdminRole,
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom(existsProductForId),
    validateFields,
  ],
  deleteProduct
);

module.exports = router;
