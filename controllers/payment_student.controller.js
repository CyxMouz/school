const bcrypt = require("bcrypt");
const db = require("../models");
const Session = db.session;
const User_student = db.user_student;
const Payment_student = db.payment_student;
exports.create = async (req, res) => {
  try {
    const student = await User_student.findByPk(req.params.studentId);
    const session = await Session.findByPk(req.params.sessionId);

    if (
      student.id !== null &&
      session.id !== null &&
      req.body.amount !== null &&
      req.body.date !== null
    ) {
      await Payment_student.create({
        amount: req.body.amount,
        date: req.body.date,
        userStudentId: student.id,
        sessionId: session.id,
      })

        .then((data) => {
          if (data)
            res.status(200).json({ message: "payment student created" });
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
    await Payment_student.update(req.body, {
      where: { id: req.params.id },
    }).then((data) => {
      if (data == 1)
        res.status(200).json({ message: "payment student updated" });
      else res.sendStatus(500);
    });
  } catch (error) {
    res.json(error.name);
  }
};
exports.findOne = async (req, res) => {
  await Payment_student.findOne({
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
  await Payment_student.findAll()
    .then((Cours) => {
      if (Cours) res.status(200).json(Cours);
      else res.sendStatus(404);
    })
    .catch((err) => {
      res.json(err.name);
    });
};
exports.delete = async (req, res) => {
  await Payment_student.destroy({
    where: { id: req.params.id },
  })
    .then((data) => {
      if (data == 1) res.status(200).send("payment student deleted");
      else res.sendStatus(501);
    })
    .catch((error) => {
      res.json(error.name);
    });
};
