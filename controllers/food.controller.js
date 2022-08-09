const bcrypt = require("bcrypt");
const db = require("../models");
const Food = db.food;
const School = db.school;

exports.create = async (req, res) => {
  let name = req.body.name;
  let schoolId = req.body.schoolId;
  try {
    const food = await Food.create({ name });
    const school = await School.findByPk(req.schoolId);

    await school
      .addFood(food)
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
    await Food.update(req.body, { where: { id: req.params.id } }).then(
      (data) => {
        if (data == 1) res.status(200).json({ message: "Food updated" });
        else res.sendStatus(500);
      }
    );
  } catch (error) {
    res.json(error.name);
  }
};
exports.findOne = async (req, res) => {
  await Food.findOne({
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
  await Food.findAll()
    .then((Food) => {
      if (Food) res.status(200).json(Food);
      else res.sendStatus(404);
    })
    .catch((err) => {
      res.json(err.name);
    });
};
exports.delete = async (req, res) => {
  await Food.destroy({
    where: { id: req.params.id },
  })
    .then((data) => {
      if (data == 1) res.status(200).send("Food deleted");
      else res.sendStatus(501);
    })
    .catch((error) => {
      res.json(error.name);
    });
};
