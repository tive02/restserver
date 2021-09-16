const { Router } = require("express");
const { buscar: search } = require("../controllers/search");

const router = Router();

router.get("/:collection/:word", search);

module.exports = router;
