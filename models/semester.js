"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class semester extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ session, cours }) {
      this.belongsTo(session);
      this.hasMany(cours, { onDelete: "CASCADE" });
    }
  }
  semester.init(
    {
      name: DataTypes.STRING,
      date_begin: DataTypes.DATE,
      date_end: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "semester",
    }
  );
  return semester;
};
