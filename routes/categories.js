const { Router } = require("express");
const { check } = require("express-validator");

const { validateFields } = require("../middlewares/validate-fields");

const router = Router();
//Obtener todas las categorias publicas
router.get("/", (req, res) => {
  res.json("Todo OK");
});

//Obtener una categoria por id - publicas
router.get("/:id", (req, res) => {
  res.json("Get id");
});

//Crear categoria - privada - cualquier persona con un token valido
router.post("/", (req, res) => {
  res.json("Post ");
});

//Actualizar unacategoria por id - publicas
router.put("/:id", (req, res) => {
  res.json("put id");
});

//Borrar una categoria por id - ADMIN
router.delete("/:id", (req, res) => {
  res.json("Delete id");
});

module.exports = router;
