"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class user_schoolmanager extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ user_school }) {
      this.belongsTo(user_school);
    }
  }
  user_schoolmanager.init(
    {},
    {
      sequelize,
      modelName: "user_schoolmanager",
    }
  );
  return user_schoolmanager;
};
