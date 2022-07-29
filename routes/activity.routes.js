const auth = require("../middlewares/authJWT");

module.exports = (app) => {
  const activitys = require("../controllers/activity.controller");
  const authJWT = require("../middlewares/authJWT");
  var router = require("express").Router();

  router.post("/", activitys.create),
    router.put("/:id", activitys.update),
    router.get("/:id", activitys.findOne),
    router.get("/", activitys.findAll),
    router.delete("/:id", activitys.delete);
  app.use("/api/activitys", router);
};
