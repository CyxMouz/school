"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class school extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({
      session,
      room,
      grade,
      activity,
      menu,
      food,
      event,
      user_school,
      modules,
      user,
    }) {
      this.hasMany(food, { onDelete: "CASCADE" });
      this.hasMany(menu, { onDelete: "CASCADE" });
      this.hasMany(session, { onDelete: "CASCADE" });
      this.hasMany(room, { onDelete: "CASCADE" });
      this.hasMany(activity, { onDelete: "CASCADE" });
      this.hasMany(event, { onDelete: "CASCADE" });
      this.hasMany(grade, { onDelete: "CASCADE" });
      this.hasMany(modules, { onDelete: "CASCADE" });
      this.belongsToMany(user, { through: user_school });
    }
  }
  school.init(
    {
      name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: { msg: "insert a valid email" },
        },
      },
      fix: {
        type: DataTypes.STRING,
        validate: {
          isNumeric: { msg: "only numbers allowed" },
        },
      },
      fax: {
        type: DataTypes.STRING,
        validate: {
          isNumeric: { msg: "only numbers allowed" },
        },
      },
      phone: {
        type: DataTypes.STRING,
        validate: {
          isNumeric: { msg: "only numbers allowed" },
        },
      },
    },
    {
      sequelize,
      modelName: "school",
    }
  );
  return school;
};
