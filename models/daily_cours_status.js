"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class daily_cours_status extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ cours }) {
      this.belongsTo(cours);
    }
  }
  daily_cours_status.init(
    {
      date: {
        type: DataTypes.DATE,
      },
      status: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "daily_cours_status",
    }
  );
  return daily_cours_status;
};
