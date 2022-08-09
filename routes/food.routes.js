const auth = require("../middlewares/authJWT");
const authJWT = require("../middlewares/authJWT");
const school_midd = require("../middlewares/userschoolMiddleware");
module.exports = (app) => {
  const foods = require("../controllers/food.controller");
  const authJWT = require("../middlewares/authJWT");
  var router = require("express").Router();
  app.use("/api/school/:schoolId", [
    authJWT.verifyToken,
    school_midd.isSchoolUser,
    authJWT.isManager,
  ]);
  router.post("/", foods.create),
    router.put("/:id", foods.update),
    router.get("/:id", foods.findOne),
    router.get("/", foods.findAll),
    router.delete("/:id", foods.delete);
  app.use("/api/school/:schoolId/foods", router);
};
