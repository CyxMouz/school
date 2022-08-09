"use strict";
var faker = require("faker");
module.exports = {
  async up(queryInterface, Sequelize) {
    for (let index = 0; index < 5; index++) {
      await queryInterface.bulkInsert(
        "schools",
        [
          {
            name: faker.hacker.ingverb() + " school",
            fix: faker.phone.phoneNumber(),
            fax: faker.phone.phoneNumber(),
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
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete("schools", null, {});
     */
  },
};
