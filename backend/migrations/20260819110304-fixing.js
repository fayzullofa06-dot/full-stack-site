'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  await queryInterface.renameColumn(
    "Enrollment",
     "created_At",
     "createdAt"
  )
  },

  async down (queryInterface, Sequelize) {
   
  }
};
