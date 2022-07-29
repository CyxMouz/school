const auth = require("../middlewares/authJWT");

module.exports = (app) => {
  const events = require("../controllers/event.controller");
  const authJWT = require("../middlewares/authJWT");
  var router = require("express").Router();

  router.post("/", events.create),
    router.put("/:id", events.update),
    router.get("/:id", events.findOne),
    router.get("/", events.findAll),
    router.delete("/:id", events.delete);
  app.use("/api/events", router);
};
