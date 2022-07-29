"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class food extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ school, menu, menu_food }) {
      this.belongsTo(school);
      this.belongsToMany(menu, { through: menu_food });
    }
  }
  food.init(
    {
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "food",
    }
  );
  return food;
};
