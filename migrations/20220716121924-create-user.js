"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        len: [3, 12],
        is: ["^[a-z]+[0-9]"],
        notEmpty: true,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
      },
      token: {
        type: Sequelize.STRING,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "user must have a name" },
          notEmpty: { msg: "name must not be empty" },
        },
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "user must have a name" },
          notEmpty: { msg: "name must not be empty" },
        },
      },
      email: {
        type: Sequelize.STRING,
        validate: {
          isEmail: { msg: "insert a valid email" },
          unique: true,
        },
      },
      phone: {
        type: Sequelize.STRING,
        validate: {
          isNumeric: { msg: "only numbers allowed" },
          unique: true,
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
    await queryInterface.dropTable("users");
  },
};
