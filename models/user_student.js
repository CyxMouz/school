"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user_student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({
      user_school,
      user_parent,
      medical_records_student,
      activity,
      activity_student,
      session,
      payment_userstudent,
      cours,
      cours_student,
      daily_presence_cours,
    }) {
      this.belongsTo(user_school);
      this.belongsTo(user_parent);
      this.hasOne(medical_records_student);
      this.belongsToMany(activity, { through: activity_student });

      this.belongsToMany(cours, { through: cours_student });
      this.belongsToMany(cours, { through: daily_presence_cours });
    }
  }
  user_student.init(
    {},
    {
      sequelize,
      modelName: "user_student",
    }
  );
  return user_student;
};
