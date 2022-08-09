require("dotenv").config();
const bcrypt = require("bcrypt");
const db = require("../models");
const User = db.user;

exports.VerifyInputs = async (req, res, next) => {
  try {
    if (
      req.body.firstName.length < 3 ||
      req.body.lastName.length < 3 ||
      req.body.username == "" ||
      req.body.password == "" ||
      req.body.username.length < 3 ||
      req.body.password.length < 6
    ) {
      res.status(400).send("inputs invalid");
    } else {
      console.log(req.body);
      next();
    }
  } catch (error) {
    res.status(400).send("please insert all attributes");
  }
};
exports.VerifyUsernameAndEmail = async (req, res, next) => {
  let email = await User.findOne({ where: { email: req.body.email } });
  let username = await User.findOne({ where: { username: req.body.username } });
  if (username === null && email === null) {
    next();
  } else {
    if (username !== null) res.status(400).send("username exist already");
    else res.status(400).send("email exist already");
  }
};
exports.addUser = async (req, res, next) => {
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
        if (data) {
          req.body.userId = data.id;
          next();
        } else
          res
            .status(404)
            .json({ message: "You can not create user for the moment !" });
      })
      .catch((err) => {
        res.json(err.name);
      });
  } catch (error) {
    res.json(error.name);
  }
};

exports.getSchoolId = async (req, res, next) => {
  req.body.schoolId = 1;
  next();
};
