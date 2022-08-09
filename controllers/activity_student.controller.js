const bcrypt = require("bcrypt");
const db = require("../models");
const activity_student = require("../models/activity_student");

const Activity = db.activity;
const User_school = db.user_school;
const User_student = db.user_student;
const Activity_stu = db.activity_student;
const User = db.user;

exports.create = async (req, res) => {
  let activityId = req.params.activityId;
  let studentId = req.params.studentId;

  try {
    const activity = await Activity.findByPk(activityId);
    const user_student = await User_student.findByPk(studentId);
    if (activity.id !== null && user_student.id !== null) {
      await user_student
        .addActivity(activity)
        .then(() => {
          res.sendStatus(200);
        })
        .catch((err) => {
          res.sendStatus(500);
        });
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.send(error);
  }
};

exports.update = async (req, res) => {
  try {
    await Activity_stu.update(req.body, { where: { id: req.params.id } }).then(
      (data) => {
        if (data == 1) res.status(200).json({ message: "Activity updated" });
        else res.sendStatus(500);
      }
    );
  } catch (error) {
    res.json(error.name);
  }
};
exports.findOne = async (req, res) => {
  await Activity_stu.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      if (data) res.status(200).json(data);
      else res.sendStatus(404);
    })
    .catch((err) => {
      res.json(err.name);
    });
};
exports.findAll = async (req, res) => {
  await Activity_stu.findAll()
    .then((Activity) => {
      if (Activity) res.status(200).json(Activity);
      else res.sendStatus(404);
    })
    .catch((err) => {
      res.json(err.name);
    });
};
exports.delete = async (req, res) => {
  await Activity_stu.destroy({
    where: { id: req.params.id },
  })
    .then((data) => {
      if (data == 1) res.status(200).send("Activity deleted");
      else res.sendStatus(501);
    })
    .catch((error) => {
      res.json(error.name);
    });
};
