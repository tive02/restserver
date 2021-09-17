const { Router } = require("express");
const { search, searchProductsForCategory } = require("../controllers/search");

const router = Router();

router.get("/:collection/:word", search);
router.get("/:category", searchProductsForCategory);

module.exports = router;
