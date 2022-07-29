"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class grade extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ school, cours }) {
      this.belongsTo(school);
      this.hasMany(cours, { onDelete: "CASCADE" });
    }
  }
  grade.init(
    {
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "grade",
    }
  );
  return grade;
};
