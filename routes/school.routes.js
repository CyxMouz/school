const auth = require("../middlewares/authJWT");

module.exports = (app) => {
  const schools = require("../controllers/school.controller");
  const authJWT = require("../middlewares/authJWT");
  var router = require("express").Router();

  router.post("/", schools.create),
    router.put("/:id", schools.update),
    router.get("/:id", schools.findOne),
    router.get("/", schools.findAll),
    router.delete("/:id", schools.delete);
  app.use("/api/schools", router);
};
