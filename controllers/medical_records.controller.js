const bcrypt = require("bcrypt");
const db = require("../models");

const User_student = db.user_student;
const Medical_records = db.medical_records_student;
exports.create = async (req, res) => {
  try {
    const student = await User_student.findByPk(req.params.studentId);

    if (student.id !== null) {
      await Medical_records.create({
        userStudentId: student.id,
        description: req.body.description,
      })

        .then((data) => {
          if (data)
            res.status(200).json({ message: "medical records created" });
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
    await Medical_records.update(req.body, {
      where: { id: req.params.id },
    }).then((data) => {
      if (data == 1) res.status(200).json({ message: "Cours updated" });
      else res.sendStatus(500);
    });
  } catch (error) {
    res.json(error.name);
  }
};
exports.findOne = async (req, res) => {
  await Medical_records.findOne({
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
  await Medical_records.findAll()
    .then((Cours) => {
      if (Cours) res.status(200).json(Cours);
      else res.sendStatus(404);
    })
    .catch((err) => {
      res.json(err.name);
    });
};
exports.delete = async (req, res) => {
  await Medical_records.destroy({
    where: { id: req.params.id },
  })
    .then((data) => {
      if (data == 1) res.status(200).send("medical records deleted");
      else res.sendStatus(501);
    })
    .catch((error) => {
      res.json(error.name);
    });
};
