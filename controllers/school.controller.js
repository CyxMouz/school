const bcrypt = require("bcrypt");
const db = require("../models");
const School = db.school;

exports.create = async (req, res) => {
  try {
    await School.create(req.body)
      .then((data) => {
        if (data) res.status(200).json({ message: "School created" });
        else res.sendStatus(403);
      })
      .catch((err) => {
        res.status(400).json(err.name);
      });
  } catch (error) {
    res.sendStatus(500);
  }
};
exports.update = async (req, res) => {
  try {
    await School.update(req.body, { where: { id: req.params.id } }).then(
      (data) => {
        if (data == 1) res.status(200).json({ message: "School updated" });
        else res.sendStatus(404);
      }
    );
  } catch (error) {
    res.sendStatus(500);
  }
};
exports.findOne = async (req, res) => {
  await School.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
};
exports.findAll = async (req, res) => {
  await School.findAll()
    .then((school) => {
      res.status(200).json(school);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
};
exports.delete = async (req, res) => {
  await School.destroy({
    where: { id: req.params.id },
  })
    .then((data) => {
      if (data == 1) res.status(200).send("School deleted");
      else res.sendStatus(501);
    })
    .catch((error) => {
      res.sendStatus(500);
    });
};
