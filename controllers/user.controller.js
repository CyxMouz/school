const bcrypt = require("bcrypt");
const db = require("../models");
const User = db.user;

exports.create = async (req, res) => {
  try {
    const user = {
      username: req.body.username,
      password: await bcrypt.hash(req.body.password, 10),
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
    };

    await User.create(user)
      .then((data) => {
        if (data) res.status(200).json({ message: "User created" });
        else
          res
            .status(404)
            .json({ message: "You can not create user for the moment !" });
      })
      .catch((err) => {
        console.log(err);
        res.json(err.name);
      });
  } catch (error) {
    res.json(error.name);
  }
};

// add middlewware to verify user token / or admin
exports.update = async (req, res) => {
  try {
    await User.update(req.body, {
      where: { uuid: req.params.id },
    }).then((data) => {
      if (data == 1) res.status(200).json({ message: "user updated" });
      else res.res.status(400).json({ message: "user not updated" });
    });
  } catch (error) {
    res.json(error.name);
  }
};

exports.findByPk = async (req, res) => {
  await User.findByPk(req.params.id, {
    attributes: {
      exclude: ["password", "uuid", "createdAt", "updatedAt", "token"],
    },
  })
    .then((user) => {
      if (user) res.status(200).json(user);
      else res.sendStatus(404);
    })
    .catch((err) => {
      res.json(err.name);
    });
};

exports.findOne = async (req, res) => {
  await User.findOne({
    where: { id: req.params.id },
    attributes: {
      exclude: ["password", "uuid", "createdAt", "updatedAt", "token"],
    },
  })
    .then((user) => {
      if (user) res.status(200).json(user);
      else res.sendStatus(404);
    })
    .catch((err) => {
      res.json(err.name);
    });
};
exports.findAll = async (req, res) => {
  await User.findAll({
    attributes: {
      exclude: ["password", "uuid", "createdAt", "updatedAt", "token"],
    },
  })
    .then((user) => {
      if (user) res.status(200).json(user);
      else res.sendStatus(404);
    })
    .catch((err) => {
      res.json(err.name);
    });
};
exports.delete = async (req, res) => {
  try {
    await User.destroy({
      where: { id: req.params.id },
    }).then((data) => {
      if (data == 1) res.status(200).send("user deleted");
      else res.sendStatus(501);
    });
  } catch (error) {
    res.json(error.name);
  }
};

// {
//   const checkEmail = new Promise((resolve, reject) => {
//     if (req.body.email) resolve(req.body.email);
//     else reject(req.body.email + " empty");
//   });
//   const addUser = new Promise((resolve, reject) => {
//     let p = User.create(req.body);
//     if (p) resolve(p);
//     else reject(p + " not created");
//   });
//   Promise.all([checkEmail, addUser])
//     .then((data) => {
//       res.status(200).json(data);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(404).json(err);
//     });
// }
