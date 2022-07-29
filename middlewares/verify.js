const db = require("../models");
const user_schoolmanager = db.user_schoolmanager;
const User = db.user;
const School = db.school;

exports.userExist = (req, res, next) => {
  User.findByPk(req.body.userId)
    .then((data) => {
      if (data !== null) {
        req.body.userId = data.id;
        next();
      } else {
        res.status(401).json({ message: "user does not exist" });
      }
    })
    .catch((err) => {
      res.status(400).send(err.message);
    });
};

exports.userNotExist = (req, res, next) => {
  User.findByPk(req.body.userId)
    .then((data) => {
      if (!data) {
        next();
      } else {
        res.status(401).send("user exist");
      }
    })
    .catch((err) => {
      res.status(400).send(err.message);
    });
};
exports.schoolExist = (req, res, next) => {
  School.findByPk(req.body.schoolId)
    .then((data) => {
      req.body.schoolId = data.id;
      next();
    })
    .catch((err) => {
      res.status(400).json({ message: "please give school id" });
    });
};
exports.schoolManagerExist = (req, res, next) => {
  user_schoolmanager
    .findOne({ where: { userId: req.body.userId } })
    .then((data) => {
      if (data) {
        req.schoolManagerId = data.id;
        next();
      } else
        res
          .status(400)
          .json({ message: "this user doesn't exist in a school manager" });
    });
};
exports.schoolManagerNotExist = (req, res, next) => {
  try {
    user_schoolmanager
      .findOne({ where: { userId: req.body.userId } })
      .then((data) => {
        if (!data) {
          next();
        } else
          res
            .status(400)
            .json({ message: "this user is already a school manager" });
      });
  } catch (error) {
    res.status(500).send(error);
  }
};
