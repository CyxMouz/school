const auth = require("../middlewares/authJWT");

module.exports = (app) => {
  const payment_student = require("../controllers/payment_student.controller");
  const authJWT = require("../middlewares/authJWT");

  const school_midd = require("../middlewares/userschoolMiddleware");
  var router = require("express").Router();
  app.use("/api/school/:schoolId", [
    authJWT.verifyToken,
    school_midd.isSchoolUser,
    authJWT.isManager || authJWT.isTeacher,
  ]);
  router.post("/student/:studentId/session/:sessionId", payment_student.create),
    router.put("/:id", payment_student.update),
    router.get("/:id", payment_student.findOne),
    router.get("/", payment_student.findAll),
    router.delete("/:id", payment_student.delete);
  app.use("/api/school/:schoolId/payment_student", router);
};
