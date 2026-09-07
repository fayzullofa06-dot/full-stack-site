'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.removeConstraint(
      "Students",
      "Students_department_id_fkey"
    );

    await queryInterface.addConstraint("Students", {
      fields: ["department_id"],
      type: "foreign key",
      name: "Students_department_id_fkey",
      references: {
        table: "Departments",
        field: "id"
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    });
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.removeConstraint(
      "Students",
      "Students_department_id_fkey"
    );

    await queryInterface.addConstraint("Students", {
      fields: ["department_id"],
      type: "foreign key",
      name: "Students_department_id_fkey",
      references: {
        table: "Departments",
        field: "id"
      }
    });
  }
};