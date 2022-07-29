const bcrypt = require("bcrypt");
const db = require("../models");

const User_SchoolManager = db.user_schoolmanager;
const User = db.user;
const School = db.school;

exports.create = async (req, res) => {
  try {
    await User_SchoolManager.create({
      userId: req.userId,
      schoolId: req.schoolId,
    })
      .then((data) => {
        res.status(200).json({
          message: `school manager ${req.userId} created in school ${req.schoolId}`,
        });
      })
      .catch((err) => {
        res.status(500).json(err.name);
      });
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.update = async (req, res) => {
  try {
    await User_SchoolManager.update(req.body, {
      where: { id: req.User_SchoolManagerId },
    })
      .then((data) => {
        if (data == 1) {
          res.status(200).json({ message: "User_SchoolManager updated" });
        } else res.json({ message: "User_SchoolManager not updated" });
      })
      .catch((err) => {
        res.json(err.name);
      });
  } catch (error) {
    res.json(error.name);
  }
};
exports.findOne = async (req, res) => {
  await User_SchoolManager.findOne({
    where: {
      id: req.params.id,
    },
    include: User.scope({ attributes: { exclude: ["password", "token"] } }),
  })
    .then((data) => {
      if (data) res.status(200).json(data.user);
      else res.sendStatus(404);
    })
    .catch((err) => {
      res.json(err.name);
    });
};
exports.findAll = async (req, res) => {
  await User_SchoolManager.findAll({
    include: User.scope({
      attributes: { exclude: ["password", "token"] },
    }),
  })
    .then((User_SchoolManager) => {
      if (User_SchoolManager) res.status(200).json(User_SchoolManager);
      else res.sendStatus(404);
    })
    .catch((err) => {
      res.json(err.name);
    });
};
exports.delete = async (req, res) => {
  await User_SchoolManager.destroy({
    where: { id: req.params.id },
  })
    .then((data) => {
      if (data == 1) res.status(200).send("User_SchoolManager deleted");
      else res.sendStatus(501);
    })
    .catch((error) => {
      res.json(error.name);
    });
};
