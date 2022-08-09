const auth = require("../middlewares/authJWT");
const users = require("../controllers/user.controller");
const authJWT = require("../middlewares/authJWT");
const school_midd = require("../middlewares/userschoolMiddleware");
const user_midd = require("../middlewares/userMiddleware");
const schools = require("../controllers/school.controller");
const user_schools = require("../controllers/user_school.controller");

var router = require("express").Router();
module.exports = (app) => {
  app.use("/api/admin", [authJWT.verifyToken, authJWT.isAdmin]);
  router.post(
    "/school/:schoolId/manager",
    [
      school_midd.isTypeUserCorrect,
      user_midd.VerifyInputs,
      user_midd.VerifyUsernameAndEmail,
    ],
    user_schools.create
  );
  router.put("/school/:schoolId/manager/:id", user_schools.update);
  router.get("/school/:schoolId/manager/:id", user_schools.findOne);
  router.get("/school/:schoolId/manager", user_schools.findAll);
  router.delete("/school/:schoolId/manager/:id", user_schools.delete);

  router.post("/school", schools.create);
  router.put("/school/:id", schools.update);
  router.get("/school/:id", schools.findOne);
  router.get("/school", schools.findAll);
  router.delete("/school/:id", schools.delete);

  router.post("/", users.create),
    router.put("/:id", users.update),
    router.get("/:id", users.findOne),
    router.get("/", users.findAll),
    router.delete("/:id", users.delete);

  app.use("/api/admin", router);
};
