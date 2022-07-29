const auth = require("../middlewares/authJWT");

module.exports = (app) => {
  const foods = require("../controllers/food.controller");
  const authJWT = require("../middlewares/authJWT");
  var router = require("express").Router();

  router.post("/", foods.create),
    router.put("/:id", foods.update),
    router.get("/:id", foods.findOne),
    router.get("/", foods.findAll),
    router.delete("/:id", foods.delete);
  app.use("/api/foods", router);
};
