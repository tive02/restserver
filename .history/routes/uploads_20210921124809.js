const { Router } = require("express");
const { check } = require("express-validator");

const { validateFields } = require("../middlewares/validate-fields");
const { loadFiles, updateImage } = require("../controllers/uploads");

const router = Router();

router.post("/", loadFiles);
router.put(
  "/:collection/:id",
  [
    check("id", "El id debe de ser de mongo").isMongoId(),
    check("collection").custom((c) =>
      publicAllocations(c, ["users", "products"])
    ),
    validateFields,
  ],
  updateImage
);

module.exports = router;
