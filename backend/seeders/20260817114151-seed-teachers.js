'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Teachers', [
      {
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: 'sarah.johnson@gmail.com',
        password: 'password123',
        department_id: 25,
        phone: 998902223344,
        hire_date: '2023-08-20',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Michael',
        lastName: 'Brown',
        email: 'michael.brown@gmail.com',
        password: 'password123',
        department_id: 25,
        phone: 998903334455,
        hire_date: '2022-05-10',
        status: 'vacation',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Teachers', null, {});
  }
};