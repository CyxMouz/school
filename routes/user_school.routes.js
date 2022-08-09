const school_midd = require("../middlewares/userschoolMiddleware");
const user_midd = require("../middlewares/userMiddleware");
const user_school = require("../controllers/user_school.controller");
const authJWT = require("../middlewares/authJWT");

var router = require("express").Router();
module.exports = (app) => {
  app.use("/api/user_schools/:schoolId", [
    authJWT.verifyToken,
    school_midd.isSchoolUser,
  ]);
  router.post(
    "/student",
    [
      authJWT.isManager,
      school_midd.isTypeUserCorrect,
      user_midd.VerifyInputs,
      user_midd.VerifyUsernameAndEmail,
    ],
    user_school.create
  ),
    router.put(
      "/student/:id",
      [school_midd.isOwner || authJWT.isManager],
      user_school.update
    ),
    router.get("/student/:id", user_school.findOne),
    router.get("/student", user_school.findAll),
    router.delete("/student/:id", authJWT.isManager, user_school.delete);
  router.post(
    "/teacher",
    [
      authJWT.isManager,
      school_midd.isTypeUserCorrect,
      user_midd.VerifyInputs,
      user_midd.VerifyUsernameAndEmail,
    ],
    user_school.create
  ),
    router.put("/teacher/:id", [school_midd.isOwner], user_school.update),
    router.get("/teacher/:id", user_school.findOne),
    router.get("/teacher", user_school.findAll),
    router.delete("/teacher/:id", authJWT.isManager, user_school.delete);
  router.post(
    "/parent",
    [
      authJWT.isManager,
      school_midd.isTypeUserCorrect,
      user_midd.VerifyInputs,
      user_midd.VerifyUsernameAndEmail,
    ],
    user_school.create
  ),
    router.put("/parent/:id", [school_midd.isOwner], user_school.update),
    router.get("/parent/:id", user_school.findOne),
    router.get("/parent", user_school.findAll),
    router.delete("/parent/:id", authJWT.isManager, user_school.delete);
  router.post(
    "/manager",
    [
      authJWT.isManager,
      school_midd.isTypeUserCorrect,
      user_midd.VerifyInputs,
      user_midd.VerifyUsernameAndEmail,
    ],
    user_school.create
  ),
    router.put("/manager/:id", [school_midd.isOwner], user_school.update),
    router.get("/manager/:id", user_school.findOne),
    router.get("/manager", user_school.findAll),
    router.delete("/manager/:id", authJWT.isManager, user_school.delete);

  app.use("/api/user_schools/:schoolId", router);
};
