"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ school, food, menu_food }) {
      this.belongsTo(school);
      this.belongsToMany(food, { through: menu_food });
    }
  }
  menu.init(
    {
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "menu",
    }
  );
  return menu;
};
