const bcrypt = require("bcrypt");
const db = require("../models");
const User = db.user;
const Admin = db.user_platformadmin;
// vérifie si user n'est pas déja platform admin
exports.create = async (req, res) => {
  if (req.body.type !== "PlatformAdmin") {
    res.status(401).send("please specify user type");
  } else {
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
          Admin.create({ userId: data.id })
            .then(() => {
              res.status(201).send("administrator created");
            })
            .catch((err) => {
              User.destroy({
                where: { id: data.id },
              });
              res.sendStatus(500);
            });
        })
        .catch((err) => {
          res.sendStatus(500);
        });
    } catch (err) {
      res.sendStatus(500);
    }
  }
};

// add middlewware to verify user token / or admin
exports.update = async (req, res) => {
  try {
    await User.update(req.body, {
      where: { id: req.params.id },
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

exports.userFindOne = async (req, res) => {
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
exports.usersFindAll = async (req, res) => {
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
exports.usersDelete = async (req, res) => {
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
  await Admin.findAll({
    attributes: {
      exclude: ["password", "uuid", "createdAt", "updatedAt", "token"],
    },
    include: User,
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
