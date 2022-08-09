const auth = require("../middlewares/authJWT");

module.exports = (app) => {
  const activitys = require("../controllers/activity.controller");
  const authJWT = require("../middlewares/authJWT");
  const school_midd = require("../middlewares/userschoolMiddleware");
  var router = require("express").Router();
  app.use("/api/school/:schoolId", [
    authJWT.verifyToken,
    school_midd.isSchoolUser,
    authJWT.isManager,
  ]);
  router.post("/", activitys.create),
    router.put("/:id", activitys.update),
    router.get("/:id", activitys.findOne),
    router.get("/", activitys.findAll),
    router.delete("/:id", activitys.delete);
  app.use("/api/school/:schoolId/activitys", router);
};
