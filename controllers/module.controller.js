const bcrypt = require("bcrypt");
const db = require("../models");
const Modul = db.modules;
const School = db.school;
exports.create = async (req, res) => {
  let name = req.body.name;
  let schoolId = req.body.schoolId;
  try {
    const modul = await Modul.create({ name });
    const school = await School.findByPk(req.schoolId);

    await school
      .addModule(modul)
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
    await Modul.update(req.body, { where: { id: req.params.id } }).then(
      (data) => {
        if (data == 1) res.status(200).json({ message: "Modul updated" });
        else res.sendStatus(500);
      }
    );
  } catch (error) {
    res.json(error.name);
  }
};
exports.findOne = async (req, res) => {
  await Modul.findOne({
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
  await Modul.findAll()
    .then((Modul) => {
      if (Modul) res.status(200).json(Modul);
      else res.sendStatus(404);
    })
    .catch((err) => {
      res.json(err.name);
    });
};
exports.delete = async (req, res) => {
  await Modul.destroy({
    where: { id: req.params.id },
  })
    .then((data) => {
      if (data == 1) res.status(200).send("Modul deleted");
      else res.sendStatus(501);
    })
    .catch((error) => {
      res.json(error.name);
    });
};
