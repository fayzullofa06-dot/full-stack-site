'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.removeColumn('Students','email')
   await queryInterface.removeColumn('Students','password')
   await queryInterface.removeColumn('Students','firstName')
   await queryInterface.removeColumn('Students','lastName')
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.addColumn('Students', 'email', {
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.addColumn('Students', 'password', {
      type: Sequelize.STRING,
      allowNull: false
    });
  }
};
