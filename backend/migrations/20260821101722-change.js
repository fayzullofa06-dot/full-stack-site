'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  await queryInterface.addColumn('Teachers',
    "role",
    {
      type:Sequelize.ENUM('teacher'),
    }
  )
  },

  async down (queryInterface, Sequelize) {
    
  }
};
