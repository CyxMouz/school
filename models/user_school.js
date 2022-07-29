"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user_school extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({
      school,
      user,
      user_parent,
      user_schoolmanager,
      user_student,
      user_teacher,
    }) {
      this.belongsTo(school, { foreignKey: "schoolId" });
      this.belongsTo(user, { foreignKey: "userId" });
      this.hasMany(user_teacher, { onDelete: "CASCADE" });
      this.hasMany(user_student, { onDelete: "CASCADE" });
      this.hasMany(user_schoolmanager, { onDelete: "CASCADE" });
      this.hasMany(user_parent, { onDelete: "CASCADE" });
    }
  }
  user_school.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },

      schoolId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
    },
    {
      sequelize,
      modelName: "user_school",
    }
  );
  return user_school;
};
