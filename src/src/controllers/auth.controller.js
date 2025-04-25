const { response, request } = require("express");
const CustomError = require("../config/errors");
const UserModel = require("../databases/models/user.model");
const Encrypter = require("../config/encryptor");
const JWT = require("../config/jwt");
// const { sendRecoveryCode } = require("../email/emails");
const PermissionModel = require("../databases/models/permission.model");
const JsonErrorReader = require("../config/reader");

class AuthController {
  static #handleError = (error, res = response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({
        status: false,
        statusCode: error.statusCode,
        data: null,
        error: JsonErrorReader.readError(error.message),
      });
    }
    console.error(error);
    return res
      .status(500)
      .json({ status: false, statusCode: 500, data: null, error: "AU5000" });
  };

  static login = async (req = request, res = response) => {
    try {
      let data = req.body;
      const user = await UserModel.findOneByColumn("email", data.email);
      if (!user) throw CustomError.loginError("AU2000");
      const { password, active, id_profile } = user;
      if (!active || ![2, 3, 5].includes(id_profile))
        throw CustomError.loginError("AU2001");
      const isValidPassword = Encrypter.compare(data.password, password);
      if (!isValidPassword) throw CustomError.loginError("AU2002");
      const token = await JWT.generateToken({
        email: user.email,
        role: user.id_profile,
      });
      let modules = [];
      const permissions = await PermissionModel.findByRole(user.id_profile);
      if (permissions.length) {
        modules = permissions.map(({ module }) => module);
      }
      if (user.id_profile !== 2 && !modules.length)
        throw CustomError.loginError("AU2005");
      return res.status(200).json({
        status: true,
        data: {
          token,
          user: {
            names: user.firstname,
            surnames: user.lastname,
            email: user.email,
            photo: null,
            role: user.id_profile,
            modules,
          },
        },
        error: null,
      });
    } catch (error) {
      this.#handleError(error, res);
    }
  };

  static validateEmail = async (req = request, res = response) => {
    try {
      let { email } = req.body;
      const user = await UserModel.findOneByColumn("email", email);
      if (!user) throw CustomError.loginError("AU2000");
      const { active, id_profile } = user;
      if (!active || ![2, 3, 5].includes(id_profile))
        throw CustomError.loginError("AU2001");
      return res.status(200).json({ status: true, data: null, error: null });
    } catch (error) {
      this.#handleError(error, res);
    }
  };

  static renew = async (req = request, res = response) => {
    try {
      const { email } = req;
      const user = await UserModel.findOneByColumn("email", email);
      if (!user) throw CustomError.loginError("AU2000");
      const { active, id_profile } = user;
      if (!active || ![2, 3, 5].includes(id_profile))
        throw CustomError.loginError("AU2001");
      const token = await JWT.generateToken({
        email: user.email,
        role: user.id_profile,
      });
      let modules = [];
      const permissions = await PermissionModel.findByRole(user.id_profile);
      if (permissions.length) {
        modules = permissions.map(({ module }) => module);
      }
      if (user.id_profile !== 2 && !modules.length)
        throw CustomError.loginError("AU2005");
      return res.status(200).json({
        status: true,
        data: {
          token,
          user: {
            names: user.firstname,
            surnames: user.lastname,
            email: user.email,
            photo: null,
            role: user.id_profile,
            modules,
          },
        },
        error: null,
      });
    } catch (error) {
      this.#handleError(error, res);
    }
  };
}

module.exports = AuthController;
