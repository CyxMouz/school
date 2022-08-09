const bcrypt = require("bcrypt");
const db = require("../models");
const Grade = db.grade;
const School = db.school;
exports.create = async (req, res) => {
  let name = req.body.name;
  let schoolId = req.body.schoolId;
  try {
    const grade = await Grade.create({ name });
    const school = await School.findByPk(req.schoolId);

    await school
      .addGrade(grade)
      .then((data) => {
        res.status(200).json(data);
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
    await Grade.update(req.body, { where: { id: req.params.id } }).then(
      (data) => {
        if (data == 1) res.status(200).json({ message: "Grade updated" });
        else res.sendStatus(500);
      }
    );
  } catch (error) {
    res.json(error.name);
  }
};
exports.findOne = async (req, res) => {
  await Grade.findOne({
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
  await Grade.findAll()
    .then((Grade) => {
      if (Grade) res.status(200).json(Grade);
      else res.sendStatus(404);
    })
    .catch((err) => {
      res.json(err.name);
    });
};
exports.delete = async (req, res) => {
  await Grade.destroy({
    where: { id: req.params.id },
  })
    .then((data) => {
      if (data == 1) res.status(200).send("Grade deleted");
      else res.sendStatus(501);
    })
    .catch((error) => {
      res.json(error.name);
    });
};
