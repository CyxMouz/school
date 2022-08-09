require("dotenv").config();
const bcrypt = require("bcrypt");
const db = require("../models");
const jwt = require("jsonwebtoken");

const User = db.user;
const Role = db.role;
const Admin = db.user_platformadmin;
const Manager = db.user_schoolmanager;
const Parent = db.user_parent;
const Student = db.user_student;
const Teacher = db.user_teacher;
const User_school = db.user_school;
verifyInputs = async (req, res, next) => {
  let x = req.body.password;
  let y = req.body.username;
  if (!x || !y || x == "" || y == "" || x.length < 6 || y.length < 3) {
    res.status(400).send("verify username & password");
  } else {
    next();
  }
};

authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    next();
  });
};

isExist = async (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;
  const user = await User.findOne({ username });
  if (!user) return res.sendStatus(404);
  if (!(await bcrypt.compare(password, user.password)))
    return res.sendStatus(401);
  if (user && (await bcrypt.compare(password, user.password))) {
    next();
  }
};

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }

    User.findOne({ where: { username: decoded.username } })
      .then((data) => {
        req.userId = data.id;
        next();
      })
      .catch((err) => {
        res.sendStatu(401);
      });
  });
};

isLogged = (req, res, next) => {};

isAdmin = (req, res, next) => {
  User.findOne({
    where: { id: req.userId },
    include: Admin,
  })
    .then((data) => {
      if (data.user_platformadmins[0] !== undefined) {
        next();
      } else res.sendStatus(401);

      // res.status(401).json({ message: "must be administrator" });
    })
    .catch((err) => {
      res.sendStatus(404);
    });
};

isManager = (req, res, next) => {
  User_school.findOne({
    where: { userId: req.userId },
    include: Manager,
  })
    .then((data) => {
      if (data.user_schoolmanagers[0].id !== undefined) {
        next();
      } else res.sendStatus(401);

      // res.status(401).json({ message: "must be administrator" });
    })
    .catch((err) => {
      res.sendStatus(400);
    });
};
isParent = (req, res, next) => {
  User.findOne({
    where: { id: req.userId },
    include: Parent,
  })
    .then((data) => {
      if (data.user_parents[0] !== undefined) {
        next();
      } else res.sendStatus(401);

      // res.status(401).json({ message: "must be administrator" });
    })
    .catch((err) => {
      res.sendStatus(404);
    });
};
isStudent = (req, res, next) => {
  User.findOne({
    where: { id: req.userId },
    include: Student,
  })
    .then((data) => {
      if (data.user_students[0] !== undefined) {
        next();
      } else res.sendStatus(401);

      // res.status(401).json({ message: "must be administrator" });
    })
    .catch((err) => {
      res.sendStatus(404);
    });
};
isTeacher = (req, res, next) => {
  User.findOne({
    where: { id: req.userId },
    include: Teacher,
  })
    .then((data) => {
      if (data.user_teachers[0] !== undefined) {
        next();
      } else res.sendStatus(401);

      // res.status(401).json({ message: "must be administrator" });
    })
    .catch((err) => {
      res.sendStatus(404);
    });
};

const auth = {
  authenticateToken: authenticateToken,
  verifyToken: verifyToken,
  isExist: isExist,
  verifyInputs: verifyInputs,
  isAdmin: isAdmin,
  isManager: isManager,
  isStudent: isStudent,
  isTeacher: isTeacher,
};
module.exports = auth;
