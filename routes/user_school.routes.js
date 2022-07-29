const verify = require("../middlewares/verify");
const auth = require("../middlewares/authJWT");
const user_school = require("../controllers/user_school.controller");

var router = require("express").Router();
module.exports = (app) => {
  router.post("/", user_school.create),
    router.put("/:id", user_school.update),
    router.get("/:id", user_school.findOne),
    router.get("/", user_school.findAll),
    router.delete("/:id", user_school.delete);
  app.use("/api/user_schools", router);
};
