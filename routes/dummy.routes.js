module.exports = (app) => {
  const dummy = require("../middlewares/dummyInsert");
  var router = require("express").Router();

  router.post("/", dummy.create), app.use("/api/dummy", router);
};
