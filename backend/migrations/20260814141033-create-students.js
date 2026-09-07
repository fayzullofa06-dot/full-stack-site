'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.createTable('Students',{
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },

      firstName: {
        type: Sequelize.STRING,
        allowNull: false
      },

      lastName: {
        type: Sequelize.STRING,
        allowNull: false
      },

      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },

      password: {
        type: Sequelize.STRING,
        allowNull: false
      },

      phone: {
        type: Sequelize.STRING,
        allowNull: true
      },
           status: {
        type: Sequelize.ENUM('active', 'inactive'),
        allowNull: false,
        defaultValue: 'active'
      },

      department_id: {
        type: Sequelize.INTEGER,

        references: {
          model: 'Departments',
          key: 'id'
        },

        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
   })
  },

  async down (queryInterface, Sequelize) {
   await  queryInterface.dropTable('Students')
  }
};
