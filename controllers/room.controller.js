const bcrypt = require("bcrypt");
const db = require("../models");
const Room = db.room;

exports.create = async (req, res) => {
  try {
    await Room.create(req.body)
      .then((data) => {
        if (data) res.status(200).json({ message: "Room created" });
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
    await Room.update(req.body, { where: { id: req.params.id } }).then(
      (data) => {
        if (data == 1) res.status(200).json({ message: "Room updated" });
        else res.sendStatus(500);
      }
    );
  } catch (error) {
    res.json(error.name);
  }
};
exports.findOne = async (req, res) => {
  await Room.findOne({
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
  await Room.findAll()
    .then((Room) => {
      if (Room) res.status(200).json(Room);
      else res.sendStatus(404);
    })
    .catch((err) => {
      res.json(err.name);
    });
};
exports.delete = async (req, res) => {
  await Room.destroy({
    where: { id: req.params.id },
  })
    .then((data) => {
      if (data == 1) res.status(200).send("Room deleted");
      else res.sendStatus(501);
    })
    .catch((error) => {
      res.json(error.name);
    });
};
