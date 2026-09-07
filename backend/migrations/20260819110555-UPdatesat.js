'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.renameColumn(
    "Enrollment",
     "Updated_at",
     "updatedAt"
  )
  },

  async down (queryInterface, Sequelize) {
 
  }
};
