const db = require("../models");
var faker = require("faker");
var bcrypt = require("bcryptjs");
const { add } = require("nodemon/lib/rules");
const User = db.user;
const User_school = db.user_school;
const User_student = db.user_student;
const User_parent = db.user_parent;
const User_teacher = db.user_teacher;
const User_schoolmanager = db.user_schoolmanager;
const User_platformadmin = db.user_platformadmin;
const School = db.school;
exports.create = async (req, res) => {
  try {
    // let userList = [];
    // // create 15 users
    // for (let i = 0; i < 20; i++) {
    //   await User.create({
    //     username: faker.name.firstName(),
    //     firstName: faker.name.firstName(),
    //     lastName: faker.name.lastName(),
    //     password: await bcrypt.hash("123456789", 10),
    //     phone: faker.phone.phoneNumber(),
    //     email: faker.internet.email(),
    //   }).then((data) => {
    //     userList.push(data);
    //   });
    // }
    // // create 1 platform admin

    // let user = await User.create({
    //   username: faker.name.firstName(),
    //   firstName: faker.name.firstName(),
    //   lastName: faker.name.lastName(),
    //   password: await bcrypt.hash("123456789", 10),
    //   phone: faker.phone.phoneNumber(),
    //   email: faker.internet.email(),
    // });
    // let userAdmin = await User_platformadmin.create();
    // await user
    //   .addUser_platformadmin(userAdmin)
    //   .then(() => {
    //     res.status(200).send("done");
    //   })
    //   .catch((err) => {
    //     res.status(500).send(err);
    //   });

    // // create 5 teacher & 5 student & 5 parent

    // let school = await School.create({ name: "koleashcool" });
    // for (let i = 0; i < userList.length; i++) {
    //   // create user school
    //   let us = await User_school.create({
    //     userId: userList[i].id,
    //     schoolId: school.id,
    //   });
    //   // add user school to a school

    //   if (i < 5) {
    //     let userStudent = await User_student.create();
    //     us.addUser_student(userStudent);
    //   }
    //   if (i > 4 && i < 10) {
    //     let userTeacher = await User_teacher.create();
    //     us.addUser_teacher(userTeacher);
    //   }
    //   if (i > 9 && i < 15) {
    //     let userManager = await User_schoolmanager.create();
    //     us.addUser_schoolmanager(userManager);
    //   }
    //   if (i > 14) {
    //     let userParent = await User_parent.create();
    //     us.addUser_parent(userParent);
    //   }
    // }

    // // add user student to user parent
    let L = [];
    let M = [];
    let student = await User_student.findAll();
    let parent = await User_parent.findAll();
    student.forEach((student) => {
      L.push(student);
    });
    parent.forEach((parent) => {
      M.push(parent);
    });
    let fin = 0;
    for (let i = 0; i < L.length; i++) {
      //parent[i].addUser_student(student[i]);
      fin++;
    }

    res.send(L);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
