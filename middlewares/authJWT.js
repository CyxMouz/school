require("dotenv").config();
const bcrypt = require("bcrypt");
const db = require("../models");
const jwt = require("jsonwebtoken");

const User = db.user;
const Role = db.role;
authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    res.json(req.user);
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
    let user = User.findOne({ username: decoded.username });
    req.userId = user.uuid;
    console.log(userId);
    next();
  });
};

isLogged = (req, res, next) => {};

isAdmin = (req, res, next) => {
  User.findOne({ id: req.userId }, { include: Role })
    .then((data) => {
      for (let i = data.role; i < data.role.length; i++) {
        if (data.role[i] === "PlatformAdmin") next();
      }
      res.status(401).json({ message: "must be administrator" });
    })
    .catch((err) => {
      res.sendStatus(404);
    });
};

isManager = (req, res, next) => {};
isParent = (req, res, next) => {};
isStudent = (req, res, next) => {};

const auth = {
  authenticateToken: authenticateToken,
  verifyToken: verifyToken,
  isExist: isExist,
};
module.exports = auth;
