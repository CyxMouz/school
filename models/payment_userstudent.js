"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class payment_userstudent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ session, user }) {
      this.belongsTo(user);
      this.belongsTo(session);
    }
  }

  payment_userstudent.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.UUID,
        foreignKey: true,
      },
      sessionId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
      amount: {
        type: DataTypes.FLOAT,
      },
      date: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "payment_userstudent",
    }
  );
  return payment_userstudent;
};
