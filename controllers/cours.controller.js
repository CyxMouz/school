const bcrypt = require("bcrypt");
const db = require("../models");
const Cours = db.cours;

exports.create = async (req, res) => {
  try {
    await Cours.create(req.body)
      .then((data) => {
        if (data) res.status(200).json({ message: "Cours created" });
        else res.sendStatus(403);
      })
      .catch((err) => {
        res.status(400).json(err.name);
      });
  } catch (error) {
    res.json(error.name);
  }
};
exports.update = async (req, res) => {
  try {
    await Cours.update(req.body, { where: { id: req.params.id } }).then(
      (data) => {
        if (data == 1) res.status(200).json({ message: "Cours updated" });
        else res.sendStatus(500);
      }
    );
  } catch (error) {
    res.json(error.name);
  }
};
exports.findOne = async (req, res) => {
  await Cours.findOne({
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
  await Cours.findAll()
    .then((Cours) => {
      if (Cours) res.status(200).json(Cours);
      else res.sendStatus(404);
    })
    .catch((err) => {
      res.json(err.name);
    });
};
exports.delete = async (req, res) => {
  await Cours.destroy({
    where: { id: req.params.id },
  })
    .then((data) => {
      if (data == 1) res.status(200).send("Cours deleted");
      else res.sendStatus(501);
    })
    .catch((error) => {
      res.json(error.name);
    });
};
