"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class session extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ semester, user, payment_userstudent }) {
      this.belongsToMany(user, {
        through: payment_userstudent,
      });
      this.hasMany(semester, { onDelete: "CASCADE" });
    }
  }
  session.init(
    {
      name: DataTypes.STRING,
      date_begin: DataTypes.DATE,
      date_end: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "session",
    }
  );
  return session;
};
