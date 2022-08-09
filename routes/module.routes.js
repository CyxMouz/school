const auth = require("../middlewares/authJWT");
const authJWT = require("../middlewares/authJWT");
const school_midd = require("../middlewares/userschoolMiddleware");
module.exports = (app) => {
  const modul = require("../controllers/module.controller");
  const authJWT = require("../middlewares/authJWT");
  var router = require("express").Router();
  app.use("/api/school/:schoolId", [
    authJWT.verifyToken,
    school_midd.isSchoolUser,
    authJWT.isManager,
  ]);
  router.post("/", modul.create),
    router.put("/:id", modul.update),
    router.get("/:id", modul.findOne),
    router.get("/", modul.findAll),
    router.delete("/:id", modul.delete);
  app.use("/api/school/:schoolId/modules", router);
};
