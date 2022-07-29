"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user_platformadmin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ user }) {
      this.belongsTo(user);
    }
  }
  user_platformadmin.init(
    {},
    {
      sequelize,
      modelName: "user_platformadmin",
    }
  );
  return user_platformadmin;
};
