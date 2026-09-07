'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.removeConstraint(
      "Students",
   "Students_user_id_fkey"
    )
     await queryInterface.addConstraint('Students',{
      fields:['user_id'],
      type:'foreign key',
      name:"Students_user_id_fkey",
      references:{
        table:'Users',
        field:'id'
      },
      onDelete:"CASCADE",
      onUpdate:"CASCADE"
     })
  },

  async down(queryInterface, Sequelize) {

  await queryInterface.removeConstraint(
    'Students',
    'Students_user_id_fkey'
  );

  await queryInterface.addConstraint('Students', {
    fields: ['user_id'],
    type: 'foreign key',
    name: 'Students_user_id_fkey',
    references: {
      table: 'Users',
      field: 'id'
    },
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
  });
  }}
