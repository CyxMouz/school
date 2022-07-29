"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class activity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ school, user_student, activity_student }) {
      this.belongsTo(school);
      this.belongsToMany(user_student, { through: activity_student });
    }
  }
  activity.init(
    {
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "activity",
    }
  );
  return activity;
};
