const bcrypt = require("bcrypt");
const db = require("../models");
const Cours = db.cours;
const School = db.school;
const Semester = db.semester;
const Room = db.room;
const grade = db.grade;
const Modul = db.modules;

exports.create = async (req, res) => {
  try {
    let x = await Semester.findByPk(req.params.semesterId);
    let y = await Room.findByPk(req.params.roomId);
    let z = await grade.findByPk(req.params.gradeId);
    let a = await Modul.findByPk(req.params.moduleId);

    if (x !== null && y !== null && z !== null && a !== null) {
      await Cours.create({
        semesterId: x.id,
        roomId: y.id,
        gradeId: z.id,
        moduleId: a.id,
      })

        .then((data) => {
          if (data) res.status(200).json({ message: "Cours created" });
          else res.sendStatus(403);
        })
        .catch((err) => {
          res.status(400).json(err.name);
        });
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.log(error);
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
