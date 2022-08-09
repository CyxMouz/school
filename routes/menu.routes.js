const auth = require("../middlewares/authJWT");
const authJWT = require("../middlewares/authJWT");
const school_midd = require("../middlewares/userschoolMiddleware");
module.exports = (app) => {
  const menus = require("../controllers/menu_controller");
  const authJWT = require("../middlewares/authJWT");
  var router = require("express").Router();
  app.use("/api/school/:schoolId", [
    authJWT.verifyToken,
    school_midd.isSchoolUser,
    authJWT.isManager,
  ]);
  router.post("/", menus.create),
    router.put("/:id", menus.update),
    router.get("/:id", menus.findOne),
    router.get("/", menus.findAll),
    router.delete("/:id", menus.delete);
  app.use("/api/school/:schoolId/menus", router);
};
