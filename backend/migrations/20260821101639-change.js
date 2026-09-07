'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
 
    await queryInterface.addColumn('Teachers','user_id',{
    type:Sequelize.INTEGER,
    allowNull:true,
    unique:true,
    references:{
      model:'Users',
      key:'id'
  
    },
      onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Teachers','user_id')
  }
};
