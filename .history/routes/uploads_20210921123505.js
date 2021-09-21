const { Router } = require("express");
const { check } = require("express-validator");

const { validateFields } = require("../middlewares/validate-fields");
const { loadFiles, updateImage } = require("../controllers/uploads");

const router = Router();

router.post("/", loadFiles);
router.put("/:collection/:id ", [], updateImage);

module.exports = router;
