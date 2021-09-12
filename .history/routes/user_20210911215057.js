const { Router } = require("express");

const { check } = require("express-validator");
const {
  usersGet,
  usersPut,
  usersPost,
  usersDelete,
  usersPatch,
} = require("../controllers/user");

const { validateFields } = require("../middlewares/validate-fields");
const {
  isValidRole,
  emailExists,
  existsUserForId,
} = require("../helpers/db-validators");

const router = Router();

router.get("/", usersGet);

router.put(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existsUserForId),
    check("role").custom(isValidRole),
    validateFields,
  ],
  usersPut
);

router.post(
  "/",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe de ser más de 6 letras").isLength({
      min: 6,
    }),
    check("email", "El correo no es válido").isEmail(),
    check("email").custom(emailExists),
    //check("role", "No es un rol válido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("role").custom(isValidRole),
    validateFields,
  ],
  usersPost
);

router.delete("/", usersDelete);
router.patch("/", usersPatch);

module.exports = router;
