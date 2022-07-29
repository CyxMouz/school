const auth = require("../middlewares/authJWT");

module.exports = (app) => {
  const cours = require("../controllers/cours.controller");
  const authJWT = require("../middlewares/authJWT");
  var router = require("express").Router();

  router.post("/", cours.create),
    router.put("/:id", cours.update),
    router.get("/:id", cours.findOne),
    router.get("/", cours.findAll),
    router.delete("/:id", cours.delete);
  app.use("/api/cours", router);
};
