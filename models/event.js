"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ school }) {
      this.belongsTo(school);
    }
  }
  event.init(
    {
      name: {
        type: DataTypes.STRING,
      },
      description: DataTypes.STRING,
      date_begin: DataTypes.DATE,
      date_end: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "event",
    }
  );
  return event;
};
