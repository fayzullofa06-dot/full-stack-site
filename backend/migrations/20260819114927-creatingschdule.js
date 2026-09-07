'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('schedules', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },

      courses_id: {
        type: Sequelize.BIGINT,
        allowNull: false,

        references: {
          model: 'Course',
          key: 'id'
        },

        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },

      classroom_id: {
        type: Sequelize.BIGINT,
        allowNull: false,

        references: {
          model: 'classroom',
          key: 'id'
        },

        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },

      start_time: {
        type: Sequelize.BIGINT,
        allowNull: false
      },

      finish_time: {
        type: Sequelize.BIGINT,
        allowNull: false
      },

      day: {
        type: Sequelize.BIGINT,
        allowNull: false
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('schedules');
  }
};