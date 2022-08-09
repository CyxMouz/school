const auth = require("../middlewares/authJWT");
const authJWT = require("../middlewares/authJWT");
const school_midd = require("../middlewares/userschoolMiddleware");
module.exports = (app) => {
  const sessions = require("../controllers/session.controller");
  const authJWT = require("../middlewares/authJWT");
  var router = require("express").Router();
  app.use("/api/school/:schoolId", [
    authJWT.verifyToken,
    school_midd.isSchoolUser,
    authJWT.isManager,
  ]);
  router.post("/", sessions.create),
    router.put("/:id", sessions.update),
    router.get("/:id", sessions.findOne),
    router.get("/", sessions.findAll),
    router.delete("/:id", sessions.delete);
  app.use("/api/school/:schoolId/sessions", router);
};
