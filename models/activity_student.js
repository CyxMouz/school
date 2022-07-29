"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class activity_student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ user_student, activity }) {
      this.belongsTo(user_student);
      this.belongsTo(activity);
    }
  }
  activity_student.init(
    {
      userStudentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      activityId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: "activity_student",
    }
  );
  return activity_student;
};
