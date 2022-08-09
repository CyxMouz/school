const auth = require("../middlewares/authJWT");

module.exports = (app) => {
  const homeworks = require("../controllers/homework.controller");
  const authJWT = require("../middlewares/authJWT");
  var router = require("express").Router();

  router.post("/cours/:coursId", homeworks.create),
    router.put("/:id", homeworks.update),
    router.get("/:id", homeworks.findOne),
    router.get("/", homeworks.findAll),
    router.delete("/:id", homeworks.delete);
  app.use("/api/school/:schoolId/homeworks", router);
};
