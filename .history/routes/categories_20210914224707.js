const { Router } = require("express");
const { check } = require("express-validator");

const { validateFields } = require("../middlewares/validate-fields");

const { login, googleSignin } = require("../controllers/auth");

const router = Router();

module.exports = router;
