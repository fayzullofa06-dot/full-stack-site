'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.removeColumn(
      'Users',
      "user_id",
      {
        type:Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:"Users",
          key:"id"
        },
        onDelete:"RESTRICT",
        onUpdate:"CASCADE"
      }
    
    )
  },

  async down (queryInterface, Sequelize) {
    
  }
};
