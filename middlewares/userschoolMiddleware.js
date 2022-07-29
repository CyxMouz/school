const db = require("../models");
const user_schoolmanager = db.user_schoolmanager;
const user_school = db.user_school;

exports.isUserSchoolExist = async (req, res, next) => {
  // verifier le user s'il exist
};
exports.isIdSchoolExist = async (req, res, next) => {};
exports.isUserExist = async (req, res, next) => {};
exports.isTypeUserCorrect = async (req, res, next) => {
  // verifier le type user ["student","teacher","manager"]
  if (userId && schoolId) {
    if (
      req.body.type === "student" ||
      req.body.type === "teacher" ||
      req.body.type === "manager" ||
      req.body.type === "parent"
    ) {
      if (req.body.type === "student") {
        next();
      }
      if (req.body.type === "teacher") {
        next();
      }
      if (req.body.type === "manager") {
        next();
      }
      if (req.body.type === "parentr") {
        next();
      }
    } else {
      res.send("please specify type of user");
    }
  } else {
    res.send("please give valid informations");
  }
};
exports.isNotUserSchool = async (req, res, next) => {
  await user_school
    .findOne({ schoolId: req.body.schoolId, userId: req.body.userId })
    .then((data) => {
      if (data !== null) {
        next();
      } else {
        res.status(401).send("this user belongs already to this school");
      }
    });
};
