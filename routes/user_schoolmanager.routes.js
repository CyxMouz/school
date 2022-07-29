const verify = require("../middlewares/verify");
const auth = require("../middlewares/authJWT");

module.exports = (app) => {
  const user_schoolmanager = require("../controllers/user_schoolmanager.controller");
  const authJWT = require("../middlewares/authJWT");
  var router = require("express").Router();

  router.post(
    "/",
    [verify.userNotExist, verify.schoolExist, verify.schoolManagerNotExist],
    user_schoolmanager.create
  ),
    router.put(
      "/:id",
      [verify.userExist, verify.schoolManagerExist],
      user_schoolmanager.update
    ),
    router.get("/:id", user_schoolmanager.findOne),
    router.get("/", user_schoolmanager.findAll),
    router.delete("/:id", user_schoolmanager.delete);
  app.use("/api/user_schoolmanagers", router);
};
