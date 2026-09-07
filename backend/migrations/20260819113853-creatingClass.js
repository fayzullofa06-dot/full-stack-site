'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("classroom",{
      id: {
              type: Sequelize.BIGINT,
              primaryKey: true,
              autoIncrement: true
          },
      
          building: {
              type: Sequelize.BIGINT,
              allowNull: false
          },
      
          room_number: {
              type: Sequelize.BIGINT,
              allowNull: false
          },
      
          capacity: {
              type: Sequelize.BIGINT,
              allowNull: false
          },
      
          room_type: {
              type: Sequelize.BIGINT,
              allowNull: false
          },
          createdAt:{
            type:Sequelize.DATE,
            allowNull:false
          },
          updatedAt:{
            type:Sequelize.DATE,
            allowNull:false
          }
    })
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.dropTable('classroom')
  }
};
