const db = require("../models");
const bcrypt = require("bcrypt");
const user_school = db.user_school;
const user_student = db.user_student;
const user_teacher = db.user_teacher;
const user_parent = db.user_parent;
const user_schoolmanager = db.user_schoolmanager;

const User = db.user;
const School = db.school;
// confirm user doesnt exist
// confirm type user is correct
// confirm user id & school id exist
// confirm user is manager of the school id
exports.create = async (req, res) => {
  let schoolId = req.params.schoolId;
  let type = req.body.type;
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
        user_school
          .create({ userId: data.id, schoolId: schoolId })
          .then((data) => {
            switch (type) {
              case "student":
                addStudent(data.id)
                  .then((data) => {
                    res.status(200).send({ message: `student created ` });
                  })
                  .catch((err) => {
                    res.status(500).send({ message: `${err}` });
                  });
                break;
              case "teacher":
                addTeacher(data.id)
                  .then(() => {
                    res.status(200).send({ message: "teacher created" });
                  })
                  .catch((err) => {
                    res.status(500).send({ message: `${err}` });
                  });

                break;
              case "manager":
                addManager(data.id)
                  .then(() => {
                    res.status(200).send({ message: "manager created" });
                  })
                  .catch((err) => {
                    res.status(500).send({ message: `${err}` });
                  });

                break;
              case "parent":
                addParent(data.id)
                  .then(() => {
                    res.status(200).send({ message: "parent created" });
                  })
                  .catch((err) => {
                    res.status(500).send({ message: `${err}` });
                  });

                break;

              default:
                User.destroy({
                  where: { id: data.id },
                }).then((data) => {
                  res.status(500).send({ message: "user type invalid" });
                });
                break;
            }
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
    console.log(err);
    res.sendStatus(500);
  }
};

exports.update = async (req, res) => {
  try {
    await User.update(req.body, {
      where: { id: req.params.id },
    }).then((data) => {
      res.status(200).json({ message: "user updated" });
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
  try {
    let user = await User.findByPk(req.params.id);

    await user_school
      .findOne({
        where: { userId: user.id },
        include: { all: true },
      })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.sendStatus(404);
      });
  } catch (error) {
    res.sendStatus(500);
  }
  // let us = await user.getSchools();
  // await us[0].user_school.getUser_students().then((data) => {
  //   res.send(data);
  // });

  // await User.findOne({
  //   where: { id: req.params.id },
  //   attributes: {
  //     exclude: ["password", "uuid", "createdAt", "updatedAt", "token"],
  //   },
  // })
  //   .then((user) => {
  //     if (user) res.status(200).json(user);
  //     else res.sendStatus(404);
  //   })
  //   .catch((err) => {
  //     res.json(err.name);
  //   });
};

exports.findAll = async (req, res) => {
  try {
    let allschooluser = await user_school
      .findAll({
        where: { schoolId: req.params.schoolId },
        include: [user_parent, user_student, user_teacher, user_schoolmanager],
      })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.sendStatus(404);
      });
  } catch (error) {
    res.send(error);
  }

  // await User.findAll({
  //   attributes: {
  //     exclude: ["password", "uuid", "createdAt", "updatedAt", "token"],
  //   },
  //   include: user_school,
  // })
  //   .then((user) => {
  //     if (user) res.status(200).json(user);
  //     else res.sendStatus(404);
  //   })
  //   .catch((err) => {
  //     res.json(err.name);
  //   });
};

exports.delete = async (req, res) => {
  try {
    await User.destroy({
      where: { id: req.params.id },
    })
      .then((data) => {
        if (data == 1) res.status(200).send("user deleted");
        else res.sendStatus(501);
      })
      .catch((err) => {
        res.sendstatus(501);
      });
  } catch (error) {
    res.json(error.name);
  }
};
/* --------------------------------------------*/
addSchoolUser = async (userId, schoolId) => {
  try {
    return await user_school
      .create({ userId: userId, schoolId: schoolId })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        return err;
      });
  } catch (error) {
    return error;
  }
};
addStudent = async (userSchoolId) => {
  try {
    return await user_student
      .create({ userSchoolId: userSchoolId })
      .then((data) => {
        return data;
      });
  } catch (error) {
    return error;
  }
};
addTeacher = async (userSchoolId) => {
  try {
    return await user_teacher
      .create({ userSchoolId: userSchoolId })
      .then((data) => {
        return data;
      });
  } catch (error) {
    return error;
  }
};
addParent = async (userSchoolId) => {
  try {
    return await user_parent
      .create({ userSchoolId: userSchoolId })
      .then((data) => {
        return data;
      });
  } catch (error) {
    return error;
  }
};
addManager = async (userSchoolId) => {
  try {
    return await user_schoolmanager
      .create({ userSchoolId: userSchoolId })
      .then((data) => {
        return data;
      });
  } catch (error) {
    return error;
  }
};
