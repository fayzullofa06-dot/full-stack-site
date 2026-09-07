'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.createTable('Enrollment',{
     id:{
            type:Sequelize.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
        course_id:{
            type:Sequelize.INTEGER,
            allowNull:false,
            references:{
              model:'Course',
              key:'id'
            }
        },
        student_id:{
            type:Sequelize.INTEGER,
            allowNull:false,
            references:{
              model:"Students",
              key:'id'
            }
        },
        enrolled_at:{
         type:Sequelize.DATEONLY,
         allowNull:false
        },
        created_At:{
          type:Sequelize.DATE,
          allowNull:false
        },
        Updated_at:{
          type:Sequelize.DATE,
          allowNull:false
        }
        
    
   })
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.dropTable('Enrollment')
  }
};
