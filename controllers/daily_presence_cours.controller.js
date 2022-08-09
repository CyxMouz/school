const bcrypt = require("bcrypt");
const db = require("../models");
const Cours = db.cours;
const User_student = db.user_student;
const Daily_presence_cours = db.daily_presence_cours;
exports.create = async (req, res) => {
  try {
    const student = await User_student.findByPk(req.params.studentId);
    const cours = await Cours.findByPk(req.params.coursId);

    if (
      student.id !== null &&
      cours.id !== null &&
      req.body.date !== null &&
      req.body.status !== null
    ) {
      await Daily_presence_cours.create({
        date: req.body.date,
        status: req.body.status,
        userStudentId: student.id,
        courId: cours.id,
      })

        .then((data) => {
          if (data) res.status(200).json({ message: "presence cours created" });
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
    await Daily_presence_cours.update(req.body, {
      where: { id: req.params.id },
    }).then((data) => {
      if (data == 1)
        res.status(200).json({ message: "daily presence cours updated" });
      else res.sendStatus(500);
    });
  } catch (error) {
    res.json(error.name);
  }
};
exports.findOne = async (req, res) => {
  await Daily_presence_cours.findOne({
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
  await Daily_presence_cours.findAll()
    .then((Cours) => {
      if (Cours) res.status(200).json(Cours);
      else res.sendStatus(404);
    })
    .catch((err) => {
      res.json(err.name);
    });
};
exports.delete = async (req, res) => {
  await Daily_presence_cours.destroy({
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
