const { check } = require("express-validator");
const stopValidate = require("../middlewares/validate-request.js");

const validateLogin = () => {
  return [
    check("email", "AU1002").matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    ),
    check("password", "AU1003").matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-])[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\-]{10,}$/
    ),
    stopValidate,
  ];
};

const validateEmailFormat = () => {
  return [
    check("email", "AU1002").matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    ),
    stopValidate,
  ];
};

module.exports = {
  validateLogin,
  validateEmailFormat,
};
