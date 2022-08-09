const auth = require("../middlewares/authJWT");

module.exports = (app) => {
  const daily_cours = require("../controllers/daily_cours_status.controller");
  const authJWT = require("../middlewares/authJWT");

  const school_midd = require("../middlewares/userschoolMiddleware");
  var router = require("express").Router();
  app.use("/api/school/:schoolId", [
    authJWT.verifyToken,
    school_midd.isSchoolUser,
    authJWT.isManager || authJWT.isTeacher,
  ]);
  router.post("/cours/:coursId", daily_cours.create),
    router.put("/:id", daily_cours.update),
    router.get("/:id", daily_cours.findOne),
    router.get("/", daily_cours.findAll),
    router.delete("/:id", daily_cours.delete);
  app.use("/api/school/:schoolId/daily_cours_status", router);
};
