const auth = require("../middlewares/authJWT");

module.exports = (app) => {
  const grades = require("../controllers/grade.controller");
  const authJWT = require("../middlewares/authJWT");
  var router = require("express").Router();

  router.post("/", grades.create),
    router.put("/:id", grades.update),
    router.get("/:id", grades.findOne),
    router.get("/", grades.findAll),
    router.delete("/:id", grades.delete);
  app.use("/api/grades", router);
};
