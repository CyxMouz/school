"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("schools", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        validate: {
          isEmail: { msg: "insert a valid email" },
        },
      },
      fix: {
        type: Sequelize.STRING,
        validate: {
          isNumeric: { msg: "only numbers allowed" },
        },
      },
      fax: {
        type: Sequelize.STRING,
        validate: {
          isNumeric: { msg: "only numbers allowed" },
        },
      },
      phone: {
        type: Sequelize.STRING,
        validate: {
          isNumeric: { msg: "only numbers allowed" },
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("schools");
  },
};
