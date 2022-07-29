require("dotenv").config();
const bcrypt = require("bcrypt");
const db = require("../models");

exports.VerifyInputs = async (req, res, next) => {
  let passwordCheck = new Promise((resolve, reject) => {
    if (req.body.password.length < 6) {
      reject("password must have at least 6 characters");
    } else {
      resolve("ok");
    }
  });
  let usernameCheck = new Promise((resolve, reject) => {
    if (req.body.username.length < 3 || req.body.username === "") {
      reject("username must have at least 3 characters");
    } else {
      resolve("ok");
    }
  });
  Promise.allSettled([passwordCheck, usernameCheck]).then((data) => {
    if (data[0].value === "ok" && data[1].value !== undefined) {
      next();
    } else {
      console.log(data);
      let errorTab = [];
      data.forEach((element) => {
        if (element.value !== "ok") {
          errorTab.push(element.reason);
        }
      });
      res.status(401).json(errorTab);
    }
  });
};
