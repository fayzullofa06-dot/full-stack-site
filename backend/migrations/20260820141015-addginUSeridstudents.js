'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.addColumn(
      'Students',
      "user_id",
      {
        type:Sequelize.INTEGER,
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
