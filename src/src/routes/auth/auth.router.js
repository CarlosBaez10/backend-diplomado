const { Router } = require("express");
const AuthController = require("../../controllers/auth.controller");
const AuthMiddleware = require("../../middlewares/validate-token");
const {
  validateLogin,
  validateEmailFormat,
} = require("../../validators/auth.validator");

// /api/v1/auth
class AuthRoutes {
  static get routes() {
    const router = Router();
    router.post("/login", validateLogin(), AuthController.login);
    router.post(
      "/validate_email",
      validateEmailFormat(),
      AuthController.validateEmail
    );
    router.get("/renew", AuthMiddleware.validateJWT, AuthController.renew);
    return router;
  }
}

module.exports = AuthRoutes;
