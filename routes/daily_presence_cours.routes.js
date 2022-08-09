const auth = require("../middlewares/authJWT");

module.exports = (app) => {
  const daily_presence_cours = require("../controllers/daily_presence_cours.controller");
  const authJWT = require("../middlewares/authJWT");

  const school_midd = require("../middlewares/userschoolMiddleware");
  var router = require("express").Router();
  app.use("/api/school/:schoolId", [
    authJWT.verifyToken,
    school_midd.isSchoolUser,
    authJWT.isManager || authJWT.isTeacher,
  ]);
  router.post("/student/:studentId/cours/coursId", daily_presence_cours.create),
    router.put("/:id", daily_presence_cours.update),
    router.get("/:id", daily_presence_cours.findOne),
    router.get("/", daily_presence_cours.findAll),
    router.delete("/:id", daily_presence_cours.delete);
  app.use("/api/school/:schoolId/daily_presence_cours", router);
};
