const auth = require("../middlewares/authJWT");
const authJWT = require("../middlewares/authJWT");
const school_midd = require("../middlewares/userschoolMiddleware");
module.exports = (app) => {
  const rooms = require("../controllers/room.controller");
  const authJWT = require("../middlewares/authJWT");
  var router = require("express").Router();
  app.use("/api/school/:schoolId", [
    authJWT.verifyToken,
    school_midd.isSchoolUser,
    authJWT.isManager,
  ]);
  router.post("/", rooms.create),
    router.put("/:id", rooms.update),
    router.get("/:id", rooms.findOne),
    router.get("/", rooms.findAll),
    router.delete("/:id", rooms.delete);
  app.use("/api/school/:schoolId/rooms", router);
};
