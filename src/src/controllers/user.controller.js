const { request, response } = require("express");
const CustomError = require("../config/errors");
const UserModel = require("../databases/models/user.model");
const Encrypter = require("../config/encryptor");
const JsonErrorReader = require("../config/reader");

class UserController {
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

  static list = async (req = request, res = response) => {
    try {
      const page = parseInt(req.query?.page) || 1;
      const filter = req.query?.filter || "";
      const type = parseInt(req.query?.type) || 1;
      const limit = parseInt(req.query?.perPage) || 12;
      const offset = (page - 1) * limit;
      let total_pages = 1;
      let total = 0;
      const roles = type === 3 ? [2, 3, 5] : [type];
      const users = await UserModel.findAll(limit, offset, roles, filter);
      if (users.length) {
        total_pages = Math.ceil(users.length / limit);
        total = users.length;
      }
      return res.status(200).json({
        status: true,
        data: { total, total_pages, users },
        error: null,
      });
    } catch (error) {
      this.#handleError(error, res);
    }
  };

}

module.exports = UserController;
