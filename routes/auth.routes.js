module.exports = (app) => {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  const auth = require("../controllers/auth.controller");
  const authJWT = require("../middlewares/authJWT");
  var router = require("express").Router();

  router.post("/login", [authJWT.verifyInputs, authJWT.isExist], auth.login);
  router.post("/token", auth.refreshToken);
  router.get("/posts", authJWT.authenticateToken);
  router.delete("/logout", auth.logout);
  app.use("/api/auth", router);
};
