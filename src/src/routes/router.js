const { Router } = require("express");
const AuthRoutes = require("./auth/auth.router");
const BackpanelRoutes = require("./backpanel/backpanel.router");

class AppRouter {
  static get routes() {
    const router = Router();

    router.get("/api", (_, res) => {
      return res.status(200).send("Welcome to diplomado API");
    });

    router.use("/api/v1/auth", AuthRoutes.routes);
    router.use("/api/v1/backpanel", BackpanelRoutes.routes);

    return router;
  }
}

module.exports = AppRouter;
