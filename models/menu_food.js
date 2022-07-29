"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class menu_food extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ food, menu }) {
      this.belongsTo(food);
      this.belongsTo(menu);
    }
  }
  menu_food.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      foodId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
      menuId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
      date: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "menu_food",
    }
  );
  return menu_food;
};
