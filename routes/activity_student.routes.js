const auth = require("../middlewares/authJWT");

module.exports = (app) => {
  const activity_student = require("../controllers/activity_student.controller");
  const authJWT = require("../middlewares/authJWT");
  const school_midd = require("../middlewares/userschoolMiddleware");
  var router = require("express").Router();
  app.use("/api/school/:schoolId", [
    authJWT.verifyToken,
    school_midd.isSchoolUser,
    authJWT.isManager,
  ]);
  router.post(
    "/activity/:activityId/student/:studentId",
    activity_student.create
  ),
    router.put("/:id", activity_student.update),
    router.get("/:id", activity_student.findOne),
    router.get("/", activity_student.findAll),
    router.delete("/:id", activity_student.delete);
  app.use("/api/school/:schoolId/activity_students", router);
};
