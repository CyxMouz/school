const auth = require("../middlewares/authJWT");

module.exports = (app) => {
  const sessions = require("../controllers/session.controller");
  const authJWT = require("../middlewares/authJWT");
  var router = require("express").Router();

  router.post("/", sessions.create),
    router.put("/:id", sessions.update),
    router.get("/:id", sessions.findOne),
    router.get("/", sessions.findAll),
    router.delete("/:id", sessions.delete);
  app.use("/api/sessions", router);
};
