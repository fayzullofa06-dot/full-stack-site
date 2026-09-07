'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Course',{
      id:{
              type:Sequelize.INTEGER,
              primaryKey:true,
              autoIncrement:true,
              unique:true
          },
          department_id:{
              type:Sequelize.INTEGER,
              allowNull:false,

              references:{
                model: "Departments",
                key:'id'
              }
              
          },
          teacher_id:{
              type:Sequelize.INTEGER,
              allowNull:false,
              references:{
                model:"Teachers",
                key:'id'
              },
              onUpdate:"CASCADE",
              onDelete:"RESTRICT"
          },
          name:{
              type:Sequelize.STRING,
              allowNull:false
          },
          description:{
              type:Sequelize.TEXT,
              allowNull:true
          },
          status:{
             type: Sequelize.ENUM(
          'available',
          'full',
          'completed',
          'cancelled'
      ),
      defaultValue:'available',
              allowNull:false
          },
      
          capacity:{
              type:Sequelize.INTEGER,
              allowNull:false,
              defaultValue:10
          },
          location:{
              type:Sequelize.STRING,
              allowNull:false
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
    await queryInterface.dropTable('Course')
  }
};
