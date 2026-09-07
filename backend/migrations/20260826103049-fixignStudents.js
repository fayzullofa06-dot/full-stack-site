'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.changeColumn('Students',
    'department_id',
    {
      type: Sequelize.INTEGER,
      
        references: {
          model: 'Departments',
          key: 'id'
        },

        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
    }
   )
  },

  async down (queryInterface, Sequelize) {
   
  }
};
