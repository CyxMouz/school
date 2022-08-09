const db = require("../models");
const user_schoolmanager = db.user_schoolmanager;
const user_school = db.user_school;
const user_student = db.user_student;
const User = db.user;
const School = db.school;
exports.isTypeUserCorrect = async (req, res, next) => {
  if (
    req.body.type === "student" ||
    req.body.type === "teacher" ||
    req.body.type === "manager" ||
    req.body.type === "parent"
  ) {
    next();
  } else {
    res.status(400).send("please specify type of user");
  }
};
exports.isSchoolUser = async (req, res, next) => {
  await user_school
    .findOne({ where: { userId: req.userId }, include: School })
    .then((data) => {
      if (req.params.schoolId == data.school.id) {
        req.schoolId = req.params.schoolId;
        next();
      } else {
        res.sendStatus(400);
      }
    })
    .catch(() => {
      res.sendStatus(404);
    });

  // await user.getUser_schools().then((data) => {
  //   console.log(data);
  // });
};

exports.isOwner = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.userId },
    })
      .then((user) => {
        if (user.id == req.params.id) {
          next();
        } else {
          res.sendStatus(404);
        }
      })
      .catch((err) => {
        res.sendStatus(404);
      });
  } catch (error) {
    res.sendStatus(500);
  }
};
