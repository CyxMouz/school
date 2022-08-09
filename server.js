"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const { sequelize } = require("./models");

// sql model
const db = require("./models");
const User = db.user;
const Role = db.role;

//var cookieParser = require('cookie-parser')
var bcrypt = require("bcryptjs");

// var random_name = require('node-random-name');
const path = require("path");

const corsOption = {
  origin: ["http://localhost:3000"],
};

app.use(cors(corsOption));
app.use(cors());
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

async function drop() {
  await sequelize
    .sync({ alter: true, force: true })
    .then(() => {
      return console.log("database droped!");
    })
    .catch((err) => {
      console.log(err);
    });
}

async function authDB() {
  await sequelize.authenticate();

  console.log("database connected !");
}

//drop();
authDB();

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "Welcome to Algeria School Manager Online Server." });
});

require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/school.routes")(app);
require("./routes/activity.routes")(app);
require("./routes/cours.routes")(app);
require("./routes/event.routes")(app);
require("./routes/food.routes")(app);
require("./routes/grade.routes")(app);
require("./routes/homework.routes")(app);
require("./routes/room.routes")(app);
require("./routes/session.routes")(app);
require("./routes/_limitRequestAPI")(app);

// relationnel

require("./routes/user_school.routes")(app);

require("./routes/module.routes")(app);
require("./routes/activity_student.routes")(app);
require("./routes/dummy.routes")(app);
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(` Server is running on porta ${PORT}.`);
});
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "localhost:3000");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

module.exports = app;
