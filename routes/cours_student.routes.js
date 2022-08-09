const auth = require("../middlewares/authJWT");

module.exports = (app) => {
  const cours_student = require("../controllers/cours_student.controller");
  const authJWT = require("../middlewares/authJWT");

  const school_midd = require("../middlewares/userschoolMiddleware");
  var router = require("express").Router();
  app.use("/api/school/:schoolId", [
    authJWT.verifyToken,
    school_midd.isSchoolUser,
    authJWT.isManager || authJWT.isTeacher,
  ]);
  router.post("/student/:studentId/cours/coursId", cours_student.create),
    router.put("/:id", cours_student.update),
    router.get("/:id", cours_student.findOne),
    router.get("/", cours_student.findAll),
    router.delete("/:id", cours_student.delete);
  app.use("/api/school/:schoolId/cours_student", router);
};
