const { Router } = require("express");
const { search, searchProductForCategory } = require("../controllers/search");

const router = Router();

router.get("/:collection/:word", search);
router.get("/category", searchProductForCategory);

module.exports = router;
