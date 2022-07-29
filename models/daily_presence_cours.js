"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class daily_presence_cours extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ user_student, cours }) {
      this.belongsTo(user_student);
      this.belongsTo(cours);
    }
  }
  daily_presence_cours.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      courId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
      userStudentId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
      date: {
        type: DataTypes.DATE,
      },
      status: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: "daily_presence_cours",
    }
  );
  return daily_presence_cours;
};
