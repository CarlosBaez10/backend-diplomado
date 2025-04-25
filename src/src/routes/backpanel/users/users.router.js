const { Router } = require("express");
const UserController = require("../../../controllers/user.controller");

// /api/v1/backpanel/users
class UserRoutes {
  static get routes() {
    const router = Router();
    router.get("/", UserController.list);
    return router;
  }
}

module.exports = UserRoutes;
