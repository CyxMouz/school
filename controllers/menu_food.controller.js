const bcrypt = require("bcrypt");
const db = require("../models");
const Menu = db.menu;
const Food = db.food;
const Menu_food = db.menu_food;
exports.create = async (req, res) => {
  let date = req.body.date;

  try {
    const menu = await Menu.findByPk(req.params.foodId);
    const food = await Food.findByPk(req.params.menuId);
    if (menu.id !== null && food.id !== null) {
      await Menu_food.create({ foodId: food.id, menuId: menu.id, date: date })
        .then((data) => {
          res.status(200).json(data);
        })
        .catch((err) => {
          res.status(401).send(err);
        });
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.sendStatus(500);
  }
};
exports.update = async (req, res) => {
  try {
    await Menu_food.update(req.body, { where: { id: req.params.id } }).then(
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
  await Menu_food.findOne({
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
  await Menu_food.findAll()
    .then((Menu) => {
      if (Menu) res.status(200).json(Menu);
      else res.sendStatus(404);
    })
    .catch((err) => {
      res.json(err.name);
    });
};
exports.delete = async (req, res) => {
  await Menu_food.destroy({
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
