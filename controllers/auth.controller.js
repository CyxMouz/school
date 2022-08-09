const bcrypt = require("bcrypt");
const db = require("../models");
const authJWT = require("../middlewares/authJWT");
const jwt = require("jsonwebtoken");
const User = db.user;
const refreshTokens = db.refreshToken;

exports.login = async (req, res) => {
  const user = {
    username: req.body.username,
    password: req.body.password,
  };

  const createAccessToken = new Promise((resolve, reject) => {
    const accessToken = generateAccessToken(user);
    if (accessToken !== undefined) resolve(accessToken);
    else reject("token was not generated");
  });

  const createRefreshToken = new Promise((resolve, reject) => {
    const refreshToken = generateRefreshToken(user);
    if (refreshToken !== undefined) resolve(refreshToken);
    else reject("refresh token was not generated");
  });

  Promise.all([createAccessToken, createRefreshToken])
    .then((data) => {
      refreshTokens.create({ token: data[1] });
      data = { accessToken: data[0], refreshToken: data[1] };
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json(err);
    });
};

exports.refreshToken = (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.findOne({ where: { token: refreshToken } }))
    return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ username: user.username });
    res.json({ accessToken: accessToken });
  });
};

exports.logout = (req, res) => {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.sendStatus(204);
};

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "120s",
  });
}
function generateRefreshToken(user) {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "2592000",
  });
}
