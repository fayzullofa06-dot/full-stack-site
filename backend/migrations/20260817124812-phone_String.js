'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.changeColumn(
    "Teachers",
    'phone',
    {
       type: Sequelize.STRING,
        allowNull: false
    }
   )
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.changeColumn(
    "Teachers",
    'phone',
    {
       type: Sequelize.INTEGER,
        allowNull: false
    }
   )
  }
};
