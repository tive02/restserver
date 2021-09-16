const { Router } = require("express");
const { buscar: search } = require("../controllers/search");

const router = Router();

router.get("/:coleccion/:termino", search);

module.exports = router;
