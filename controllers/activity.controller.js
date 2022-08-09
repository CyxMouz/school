const bcrypt = require("bcrypt");
const db = require("../models");
const Activity = db.activity;
const School = db.school;

exports.create = async (req, res) => {
  let name = req.body.name;

  let act;
  try {
    const school = await School.findByPk(req.schoolId);
    const activity = await Activity.create({ name });
    await school
      .addActivity(activity)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(401).send(err);
      });
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.update = async (req, res) => {
  try {
    await Activity.update(req.body, { where: { id: req.params.id } }).then(
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
  await Activity.findOne({
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
  await Activity.findAll()
    .then((Activity) => {
      if (Activity) res.status(200).json(Activity);
      else res.sendStatus(404);
    })
    .catch((err) => {
      res.json(err.name);
    });
};
exports.delete = async (req, res) => {
  await Activity.destroy({
    where: { id: req.params.id },
  })
    .then((data) => {
      if (data == 1) res.status(200).json({ message: "Activity deleted" });
      else res.sendStatus(404);
    })
    .catch((error) => {
      res.json(error.name);
    });
};
