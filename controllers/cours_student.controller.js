const bcrypt = require("bcrypt");
const db = require("../models");
const Cours = db.cours;
const User_student = db.user_student;
const Cours_student = db.cours_student;
exports.create = async (req, res) => {
  try {
    const student = await User_student.findByPk(req.params.studentId);
    const cours = await Cours.findByPk(req.params.coursId);

    if (student.id !== null && cours.id !== null) {
      await Cours_student.create({
        evalutation: req.body.evalutation,
        controle1: req.body.controle1,
        controle2: req.body.controle2,
        exam: req.body.exam,
        userStudentId: student.id,
        courId: cours.id,
      })

        .then((data) => {
          if (data) res.status(200).json({ message: "cours student created" });
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
    await Cours_student.update(req.body, { where: { id: req.params.id } }).then(
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
  await Cours_student.findOne({
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
  await Cours_student.findAll()
    .then((Cours) => {
      if (Cours) res.status(200).json(Cours);
      else res.sendStatus(404);
    })
    .catch((err) => {
      res.json(err.name);
    });
};
exports.delete = async (req, res) => {
  await Cours_student.destroy({
    where: { id: req.params.id },
  })
    .then((data) => {
      if (data == 1) res.status(200).send("Cours student deleted");
      else res.sendStatus(501);
    })
    .catch((error) => {
      res.json(error.name);
    });
};
