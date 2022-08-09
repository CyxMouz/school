const bcrypt = require("bcrypt");
const db = require("../models");
const Menu = db.menu;
const School = db.school;

exports.create = async (req, res) => {
  let name = req.body.name;
  let schoolId = req.body.schoolId;
  try {
    const menu = await Menu.create({ name });
    const school = await School.findByPk(req.schoolId);

    await school
      .addMenu(menu)
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
    await Menu.update(req.body, { where: { id: req.params.id } }).then(
      (data) => {
        if (data == 1) res.status(200).json({ message: "Menu updated" });
        else res.sendStatus(500);
      }
    );
  } catch (error) {
    res.json(error.name);
  }
};
exports.findOne = async (req, res) => {
  await Menu.findOne({
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
  await Menu.findAll()
    .then((Menu) => {
      if (Menu) res.status(200).json(Menu);
      else res.sendStatus(404);
    })
    .catch((err) => {
      res.json(err.name);
    });
};
exports.delete = async (req, res) => {
  await Menu.destroy({
    where: { id: req.params.id },
  })
    .then((data) => {
      if (data == 1) res.status(200).send("Menu deleted");
      else res.sendStatus(501);
    })
    .catch((error) => {
      res.json(error.name);
    });
};
