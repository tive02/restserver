const { Router } = require("express");
const { check } = require("express-validator");

const { validateFields } = require("../middlewares/validate-fields");

const { login } = require("../controllers/auth");
const {
  googleSignin,
} = require("../../curso-node-restserver-3.0.0/controllers/auth");

const router = Router();

router.post(
  "/login",
  [
    check("email", "El correo es obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    validateFields,
  ],
  login
);
router.post(
  "/google",
  [
    check("id_token", "El id_token es necesario").not().isEmpty(),
    validateFields,
  ],
  googleSignin
);

module.exports = router;
