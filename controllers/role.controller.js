const bcrypt = require("bcrypt");
const db = require("../models");
const Role = db.role;

exports.create = async (req, res) => {
  try {
    await Role.create(req.body).then((data) => {
      if (data) res.status(200).json({ message: "role created" });
      else res.sendStatu(403);
    });
  } catch (error) {
    res.json(error.name);
  }
};
exports.update = async (req, res) => {
  try {
    await Role.update(
      {
        roleName: req.body.roleName,
      },
      { where: { id: req.params.id } }
    ).then((data) => {
      if (data == 1) res.status(200).json({ message: "Role updated" });
      else res.sendStatus(500);
    });
  } catch (error) {
    res.json(error.name);
  }
};
exports.findOne = async (req, res) => {
  await Role.findOne({
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
  await Role.findAll()
    .then((role) => {
      if (role) res.status(200).json(role);
      else res.sendStatus(404);
    })
    .catch((err) => {
      res.json(err.name);
    });
};
exports.delete = async (req, res) => {
  await Role.destroy({
    where: { id: req.params.id },
  })
    .then((data) => {
      if (data == 1) res.status(200).send("role deleted");
      else res.sendStatus(501);
    })
    .catch((error) => {
      res.json(error.name);
    });
};
