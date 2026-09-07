'use strict';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'Students',
      "dateOfBirth",
      {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      "Students",
      'dateOfBirth',
      {
          type: Sequelize.DATEONLY,
        allowNull: true
      }
    )
    
  }
};
