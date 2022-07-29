"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class cours_student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ cours, user_student }) {
      this.belongsTo(cours);
      this.belongsTo(user_student);
    }
  }
  cours_student.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      evaluation: {
        type: DataTypes.FLOAT,
      },
      controle1: {
        type: DataTypes.FLOAT,
      },
      controle2: {
        type: DataTypes.FLOAT,
      },
      exam: {
        type: DataTypes.FLOAT,
      },
    },
    {
      sequelize,
      modelName: "cours_student",
    }
  );
  return cours_student;
};
