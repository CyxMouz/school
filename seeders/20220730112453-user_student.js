"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    for (let i = 1; i < 21; i++) {
      await queryInterface.bulkInsert(
        "user_students",
        [
          {
            userSchoolId: i,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {}
      );
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("user_students", null, {});
  },
};
