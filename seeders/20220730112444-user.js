"use strict";
var faker = require("faker");
module.exports = {
  async up(queryInterface, Sequelize) {
    for (let index = 0; index < 50; index++) {
      await queryInterface.bulkInsert(
        "users",
        [
          {
            username: faker.name.firstName(),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            password: "123456789",
            phone: faker.phone.phoneNumber(),
            email: faker.internet.email(),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {}
      );
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
