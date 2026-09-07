'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Departments',[
      { 
        department_field: 'IT',
        department_specification: 'Software Engineering',
        description: 'Software development',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Departments', null, {});
  }
};
