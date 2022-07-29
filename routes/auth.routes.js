module.exports = (app) => {
  const auth = require("../controllers/auth.controller");
  const authJWT = require("../middlewares/authJWT");
  var router = require("express").Router();

  router.post("/login", authJWT.isExist, auth.login);
  router.post("/token", auth.refreshToken);
  router.get("/posts", authJWT.authenticateToken);
  router.delete("/logout", auth.logout);
  app.use("/api/auth", router);
};
