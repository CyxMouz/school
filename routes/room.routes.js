const auth = require("../middlewares/authJWT");

module.exports = (app) => {
  const rooms = require("../controllers/room.controller");
  const authJWT = require("../middlewares/authJWT");
  var router = require("express").Router();

  router.post("/", rooms.create),
    router.put("/:id", rooms.update),
    router.get("/:id", rooms.findOne),
    router.get("/", rooms.findAll),
    router.delete("/:id", rooms.delete);
  app.use("/api/rooms", router);
};
