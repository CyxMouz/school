"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({
      user_platformadmin,
      user_school,
      school,
      session,
      payment_userstudent,
    }) {
      this.hasMany(user_platformadmin, { onDelete: "CASCADE" });
      this.belongsToMany(school, { through: user_school });
      this.belongsToMany(session, {
        through: payment_userstudent,
      });
      // this.hasMany(user_teacher, { onDelete: "CASCADE" });
      // this.hasMany(user_schoolmanager, { onDelete: "CASCADE" });
      // this.hasMany(user_role, { onDelete: "CASCADE" });
      // this.hasMany(user_parent, { onDelete: "CASCADE" });
      // this.hasMany(user_student, { onDelete: "CASCADE" });
      // this.belongsToMany(role, {
      //   foreignKey: "roleId",
      //   through: user_role,
      //   as: "roles",
      //   onDelete: "CASCADE",
      // });
      // // this.belongsToMany(this, {
      // //   foreignKey: "parentId",
      // //   through: "parents_students",
      // //   as: "parents",
      // // });
      // // this.belongsToMany(this, {
      // //   foreignKey: "studentId",
      // //   through: "parents_students",
      // //   as: "students",
      // //   onDelete: "CASCADE",
      // // });
    }

    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  user.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { message: "user must have a name" },
          notEmpty: { message: "name must not be empty" },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { message: "user must have a name" },
          notEmpty: { message: "name must not be empty" },
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: { message: "insert a valid email" },
        },
      },
      phone: {
        type: DataTypes.STRING,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        len: [3, 12],
        is: ["^[a-z]+[0-9]"],
        notEmpty: true,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
      },
      token: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};

// // 1:1
// Organization.belongsTo(User, { foreignKey: 'owner_id' });
// User.hasOne(Organization, { foreignKey: 'owner_id' });

// // 1:M
// Project.hasMany(Task, { foreignKey: 'tasks_pk' });
// Task.belongsTo(Project, { foreignKey: 'tasks_pk' });

// // N:M
// User.belongsToMany(Role, { through: 'user_has_roles', foreignKey: 'user_role_user_id' });
// Role.belongsToMany(User, { through: 'user_has_roles', foreignKey: 'roles_identifier' });
