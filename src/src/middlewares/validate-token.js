const { request, response } = require("express");
const CustomError = require("../config/errors");
const JWT = require("../config/jwt");

class AuthMiddleware {
  static #handleError = (error, res = response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({
        status: false,
        statusCode: error.statusCode,
        data: null,
        error: error.message,
      });
    }
    console.error(error);
    return res.status(500).json({
      status: false,
      statusCode: 500,
      data: null,
      error: "AU5000",
    });
  };

  static validateJWT = async (req = request, res = response, next) => {
    try {
      const authorization = req.header("Authorization");
      if (!authorization) throw CustomError.forbidden("AU1103");
      if (!authorization.startsWith("Bearer "))
        throw CustomError.forbidden("AU1104");
      const token = authorization.split(" ").at(1) || "";
      const payload = await JWT.validateToken(token);
      if (!payload) throw CustomError.forbidden("AU1105");
      req.email = payload.email;
      req.role = payload.role;
      next();
    } catch (error) {
      this.#handleError(error, res);
    }
  };
}

module.exports = AuthMiddleware;
