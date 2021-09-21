const validateFields = require("../middlewares/validate-fields");
const validateFilesSubmit = require("../middlewares/validate-files");
const validateJWT = require("../middlewares/validate-jwt");
const validateRoles = require("../middlewares/validate-roles");

module.exports = {
  ...validateFields,
  ...validateFilesSubmit,
  ...validateJWT,
  ...validateRoles,
};
