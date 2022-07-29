const db = require("../models");
const user_school = db.user_school;
const user_student = db.user_student;
const user_teacher = db.user_teacher;
const user_parent = db.user_parent;
const user_schoolmanager = db.user_schoolmanager;

// confirm user doesnt exist
// confirm type user is correct
// confirm user id & school id exist
// confirm user is manager of the school id
exports.create = async (req, res) => {
  let userId = req.body.userId;
  let schoolId = req.body.schoolId;
  let type = req.body.type;
  await user_school
    .create({ userId: userId, schoolId: schoolId })
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
              res.status(200).send("teacher created");
            })
            .catch((err) => {
              res.status(500).send({ message: `${err}` });
            });

          break;
        case "manager":
          addManager(data.id)
            .then(() => {
              res.status(200).send("manager created");
            })
            .catch((err) => {
              res.status(500).send({ message: `${err}` });
            });

          break;
        case "parent":
          addParent(data.id)
            .then(() => {
              res.status(200).send("parent created");
            })
            .catch((err) => {
              res.status(500).send({ message: `${err}` });
            });

          break;

        default:
          res.status(500).send("user type invalid");
          break;
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
exports.update = async (req, res) => {};
exports.findOne = async (req, res) => {};
exports.findAll = async (req, res) => {};
exports.delete = async (req, res) => {};

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
addStudent = async (schoolId) => {
  try {
    return await user_student
      .create({ userSchoolId: schoolId })
      .then((data) => {
        return data;
      });
  } catch (error) {
    return error;
  }
};
addTeacher = async (schoolId) => {
  try {
    return await user_teacher
      .create({ userSchoolId: schoolId })
      .then((data) => {
        return data;
      });
  } catch (error) {
    return error;
  }
};
addParent = async (schoolId) => {
  try {
    return await user_parent.create({ userSchoolId: schoolId }).then((data) => {
      return data;
    });
  } catch (error) {
    return error;
  }
};
addManager = async (schoolId) => {
  try {
    return await user_schoolmanager
      .create({ userSchoolId: schoolId })
      .then((data) => {
        return data;
      });
  } catch (error) {
    return error;
  }
};
