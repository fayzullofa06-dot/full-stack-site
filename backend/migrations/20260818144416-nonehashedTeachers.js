'use strict';
const bcrypt=require('bcrypt')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     
  const teachers = await queryInterface.sequelize.query(
            'SELECT id, password FROM "Teachers"',
            {
                type: Sequelize.QueryTypes.SELECT
            }
        );
         for (let student of teachers) {
        
                    const hashedPassword = await bcrypt.hash(
                        student.password,
                        Number(process.env.SALT)
                    );
         await queryInterface.bulkUpdate(
          "Teachers", 
          {
                    password: hashedPassword
                },
                {
                    id: student.id
                }
         )
                  
   }
  },

  async down (queryInterface, Sequelize) {
 
  }
};
