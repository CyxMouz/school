"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class homework extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ cours }) {
      this.belongsTo(cours);
    }
  }
  homework.init(
    {
      name: {
        type: DataTypes.STRING,
      },
      description: DataTypes.STRING,
      date: {
        type: DataTypes.DATE,
      },
    },

    {
      sequelize,
      modelName: "homework",
    }
  );
  return homework;
};
