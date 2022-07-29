"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user_parent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ user_student, user_school }) {
      this.belongsTo(user_school);
      this.hasMany(user_student, { onDelete: "CASCADE" });
    }
  }
  user_parent.init(
    {},
    {
      sequelize,
      modelName: "user_parent",
    }
  );
  return user_parent;
};
