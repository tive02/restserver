const { response, request } = require("express");

const isAdminRole = (req = request, res = response, next) => {};

module.exports = {
  isAdminRole,
};
