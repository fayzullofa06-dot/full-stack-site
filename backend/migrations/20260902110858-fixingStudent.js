'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.removeConstraint(
    "Enrollment",
    "Enrollment_student_id_fkey"
   )
   await queryInterface.addConstraint("Enrollment",{
    fields:['student_id'],
    type:'foreign key',
    name:'Enrollment_student_id_fkey',
    references:{
      table:"Students",
      field:'id'
    },
    onDelete:'CASCADE',
    onUpdate:"CASCADE"
   })
  },

 async down(queryInterface, Sequelize) {
  await queryInterface.removeConstraint(
    "Enrollment",
    "Enrollment_student_id_fkey"
  )

  await queryInterface.addConstraint("Enrollment", {
    fields: ["student_id"],
    type: "foreign key",
    name: "Enrollment_student_id_fkey",
    references: {
      table: "Students",
      field: "id"
    },
    onUpdate: "CASCADE"
  })
}
};
