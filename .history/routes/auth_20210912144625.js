const { Router } = require("express");
const { check } = require("express-validator");

const { validateFields } = require("../middlewares/validate-fields");

const { login } = require("../controllers/auth");

const router = Router();

router.post(
  "/login",
  [
    check("email", "El correo es obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    check("password", "El password debe de ser más de 6 letras").isLength({
      min: 6,
    }),
    validateFields,
  ],
  login
);

module.exports = router;
