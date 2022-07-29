const auth = require("../middlewares/authJWT");
const users = require("../controllers/user.controller");
const authJWT = require("../middlewares/authJWT");
const usermid = require("../middlewares/userMiddleware");
var router = require("express").Router();
module.exports = (app) => {
  // app.get("/api/users", [authJWT.authenticateToken]);
  //app.use(auth.isLogged)
  router.post("/", [usermid.VerifyInputs], users.create),
    router.put("/:id", users.update),
    // router.put("/:id", users.update),
    // router.delete("/:id", users.delete),
    router.get("/:id", users.findOne),
    router.get("/", users.findAll),
    router.delete("/:id", users.delete);
  app.use("/api/users", router);
};
