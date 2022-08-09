const auth = require("../middlewares/authJWT");

module.exports = (app) => {
  const cours = require("../controllers/cours.controller");
  const authJWT = require("../middlewares/authJWT");

  const school_midd = require("../middlewares/userschoolMiddleware");
  var router = require("express").Router();
  // app.use("/api/school/:schoolId", [
  //   authJWT.verifyToken,
  //   school_midd.isSchoolUser,
  //   authJWT.isManager,
  // ]);
  router.post(
    "/grade/:gradeId/semester/:semesterId/room/:roomId/module/:moduleId/",
    cours.create
  ),
    router.put("/:id", cours.update),
    router.get("/:id", cours.findOne),
    router.get("/", cours.findAll),
    router.delete("/:id", cours.delete);
  app.use("/api/school/:schoolId/cours", router);
};
