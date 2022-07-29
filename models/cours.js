"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class cours extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({
      semester,
      room,
      grade,
      modules,
      homework,
      daily_cours_status,
      user_student,
      cours_student,
      daily_presence_cours,
    }) {
      this.belongsTo(semester);
      this.belongsTo(room);
      this.belongsTo(grade);
      this.belongsTo(modules);
      this.hasMany(homework, { onDelete: "CASCADE" });
      this.hasMany(daily_cours_status, { onDelete: "CASCADE" });
      this.belongsToMany(user_student, { through: cours_student });
      this.belongsToMany(user_student, { through: daily_presence_cours });
    }
  }
  cours.init(
    {
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "cours",
    }
  );
  return cours;
};
