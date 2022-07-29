"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class medical_records_student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ user_student }) {
      this.belongsTo(user_student);
    }
  }
  medical_records_student.init(
    {
      description: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "medical_records_student",
    }
  );
  return medical_records_student;
};
