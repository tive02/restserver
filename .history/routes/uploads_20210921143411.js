const { Router } = require("express");
const { check } = require("express-validator");

const { validateFields, validateFileSubmit } = require("../middlewares");
const { loadFiles, updateImage } = require("../controllers/uploads");
const { publicAllocations } = require("../helpers");

const router = Router();

router.post("/", validateFileSubmit, loadFiles);
router.put(
  "/:collection/:id",
  [
    validateFileSubmit,
    check("id", "El id debe de ser de mongo").isMongoId(),
    check("collection").custom((c) =>
      publicAllocations(c, ["users", "products"])
    ),
    validateFields,
  ],
  updateImage
);

module.exports = router;
