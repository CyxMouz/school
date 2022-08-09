const bcrypt = require("bcrypt");
const db = require("../models");
const Cours = db.cours;
const Daily_cours = db.daily_cours_status;

exports.create = async (req, res) => {
  try {
    let c = await Cours.findByPk(req.params.coursId);
    let date = req.body.date;
    let status = req.body.status;

    if (c !== null && date !== null && status !== null) {
      await Daily_cours.create({ courId: c.id, date: date, status: status })

        .then((data) => {
          if (data)
            res.status(200).json({ message: "daily cours status created" });
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
    await Daily_cours.update(req.body, { where: { id: req.params.id } }).then(
      (data) => {
        if (data == 1)
          res.status(200).json({ message: "daily cours status updated" });
        else res.sendStatus(500);
      }
    );
  } catch (error) {
    res.json(error.name);
  }
};
exports.findOne = async (req, res) => {
  await Daily_cours.findOne({
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
  await Daily_cours.findAll()
    .then((Cours) => {
      if (Cours) res.status(200).json(Cours);
      else res.sendStatus(404);
    })
    .catch((err) => {
      res.json(err.name);
    });
};
exports.delete = async (req, res) => {
  await Daily_cours.destroy({
    where: { id: req.params.id },
  })
    .then((data) => {
      if (data == 1) res.status(200).send("daily cours status deleted");
      else res.sendStatus(501);
    })
    .catch((error) => {
      res.json(error.name);
    });
};
