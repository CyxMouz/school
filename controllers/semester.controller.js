const bcrypt = require("bcrypt");
const db = require("../models");
const Semester = db.semester;
const Session = db.session;
exports.create = async (req, res) => {
  let name = req.body.name;
  let date_begin = req.body.date_begin;
  let date_end = req.body.date_end;
  let sessionId = req.body.sessionId;
  try {
    const semester = await Semester.create({ name });
    const session = await Session.findByPk(sessionId);

    await session
      .addSemester(semester)
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
    await Semester.update(req.body, { where: { id: req.params.id } }).then(
      (data) => {
        if (data == 1) res.status(200).json({ message: "Semester updated" });
        else res.sendStatus(500);
      }
    );
  } catch (error) {
    res.json(error.name);
  }
};
exports.findOne = async (req, res) => {
  await Semester.findOne({
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
  await Semester.findAll()
    .then((Semester) => {
      if (Semester) res.status(200).json(Semester);
      else res.sendStatus(404);
    })
    .catch((err) => {
      res.json(err.name);
    });
};
exports.delete = async (req, res) => {
  await Semester.destroy({
    where: { id: req.params.id },
  })
    .then((data) => {
      if (data == 1) res.status(200).send("Semester deleted");
      else res.sendStatus(501);
    })
    .catch((error) => {
      res.json(error.name);
    });
};
