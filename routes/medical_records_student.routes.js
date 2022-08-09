const auth = require("../middlewares/authJWT");

module.exports = (app) => {
  const medical_records = require("../controllers/medical_records.controller");
  const authJWT = require("../middlewares/authJWT");

  const school_midd = require("../middlewares/userschoolMiddleware");
  var router = require("express").Router();
  app.use("/api/school/:schoolId", [
    authJWT.verifyToken,
    school_midd.isSchoolUser,
    authJWT.isManager || authJWT.isTeacher,
  ]);
  router.post("/student/:studentId", medical_records.create),
    router.put("/:id", medical_records.update),
    router.get("/:id", medical_records.findOne),
    router.get("/", medical_records.findAll),
    router.delete("/:id", medical_records.delete);
  app.use("/api/school/:schoolId/medical_records", router);
};
