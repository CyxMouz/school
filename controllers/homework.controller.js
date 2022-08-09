const bcrypt = require("bcrypt");
const db = require("../models");
const Cours = db.cours;
const Homework = db.homework;

exports.create = async (req, res) => {
  try {
    let c = await Cours.findByPk(req.params.coursId);
    if (c !== null) {
      await Homework.create({
        name: req.body.name,
        description: req.body.description,
        date: req.body.date,
        courId: c.id,
      })
        .then((data) => {
          if (data) res.status(200).json({ message: "Homework created" });
          else res.sendStatus(403);
        })
        .catch((err) => {
          res.status(400).json(err.name);
        });
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.json(error.name);
  }
};
exports.update = async (req, res) => {
  try {
    await Homework.update(req.body, { where: { id: req.params.id } }).then(
      (data) => {
        if (data == 1) res.status(200).json({ message: "Homework updated" });
        else res.sendStatus(500);
      }
    );
  } catch (error) {
    res.json(error.name);
  }
};
exports.findOne = async (req, res) => {
  await Homework.findOne({
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
  await Homework.findAll()
    .then((Homework) => {
      if (Homework) res.status(200).json(Homework);
      else res.sendStatus(404);
    })
    .catch((err) => {
      res.json(err.name);
    });
};
exports.delete = async (req, res) => {
  await Homework.destroy({
    where: { id: req.params.id },
  })
    .then((data) => {
      if (data == 1) res.status(200).send("Homework deleted");
      else res.sendStatus(501);
    })
    .catch((error) => {
      res.json(error.name);
    });
};
