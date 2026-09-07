  'use strict';

  /** @type {import('sequelize-cli').Migration} */
  module.exports = {
    async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Teachers',{

          id:{
          type:Sequelize.INTEGER,
          autoIncrement:true,
          unique:true,
          primaryKey:true
          },
          firstName:{
              type:Sequelize.STRING,
              allowNull:false,
          },
          lastName:{
              type:Sequelize.STRING,
              allowNull:false
          },
          email:{
              type:Sequelize.STRING,
              unique:true,
              allowNull:false,
          },
          password:{
              type:Sequelize.STRING,
              allowNull:false
          },
          department_id:{
              type:Sequelize.INTEGER,
              allowNull:false,
                   references:{
            model:"Departments",
            key:"id"
        },
        onUpdate:"CASCADE",
        onDelete:'RESTRICT'
          },
          phone:{
              type:Sequelize.STRING,
              allowNull:false
          },
          hire_date:{
          type:Sequelize.DATEONLY,
          allowNull:false
          },
          status:{
              type:Sequelize.ENUM('active','fired','vacation')
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
      await queryInterface.dropTable("Teachers",)
    }
  }
