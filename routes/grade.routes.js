const auth = require("../middlewares/authJWT");
const authJWT = require("../middlewares/authJWT");
const school_midd = require("../middlewares/userschoolMiddleware");
module.exports = (app) => {
  const grades = require("../controllers/grade.controller");
  const authJWT = require("../middlewares/authJWT");
  var router = require("express").Router();
  app.use("/api/school/:schoolId", [
    authJWT.verifyToken,
    school_midd.isSchoolUser,
    authJWT.isManager,
  ]);
  router.post("/", grades.create),
    router.put("/:id", grades.update),
    router.get("/:id", grades.findOne),
    router.get("/", grades.findAll),
    router.delete("/:id", grades.delete);
  app.use("/api/school/:schoolId/grades", router);
};
