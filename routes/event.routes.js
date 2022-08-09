const auth = require("../middlewares/authJWT");
const authJWT = require("../middlewares/authJWT");
const school_midd = require("../middlewares/userschoolMiddleware");
module.exports = (app) => {
  const events = require("../controllers/event.controller");
  const authJWT = require("../middlewares/authJWT");
  var router = require("express").Router();
  app.use("/api/school/:schoolId", [
    authJWT.verifyToken,
    school_midd.isSchoolUser,
    authJWT.isManager,
  ]);
  router.post("/", events.create),
    router.put("/:id", events.update),
    router.get("/:id", events.findOne),
    router.get("/", events.findAll),
    router.delete("/:id", events.delete);
  app.use("/api/school/:schoolId/events", router);
};
