"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user_teacher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ cours, user_school }) {
      this.belongsTo(cours);
      this.belongsTo(user_school);
    }
  }
  user_teacher.init(
    {},
    {
      sequelize,
      modelName: "user_teacher",
    }
  );
  return user_teacher;
};
