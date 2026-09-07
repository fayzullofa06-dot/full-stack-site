'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  await queryInterface.bulkInsert("Students",[
      {
        firstName: 'sosad',
        lastName: 'abdullaev',
        email: 'diyour@example.com',
        password: 'hashed-password',
        phone: '123456789',
          dateOfBirth: "2000-05-14",
        status: 'active',
        department_id: 24,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Students')
  }
};
