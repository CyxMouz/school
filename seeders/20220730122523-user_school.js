"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    for (let i = 1; i < 21; i++) {
      await queryInterface.bulkInsert(
        "user_schools",
        [
          {
            id: i,
            schoolId: 1,
            userId: i,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {}
      );
    }
    for (let i = 21; i < 41; i++) {
      await queryInterface.bulkInsert(
        "user_schools",
        [
          {
            id: i,
            schoolId: 2,
            userId: i,
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
     * await queryInterface.bulkDelete("user_school", null, {});
     */
  },
};
