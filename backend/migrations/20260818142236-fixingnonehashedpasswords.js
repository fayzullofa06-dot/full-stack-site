'use strict';

const bcrypt = require('bcrypt');


/** @type {import('sequelize-cli').Migration} */
module.exports = {

    async up(queryInterface, Sequelize) {

        const students = await queryInterface.sequelize.query(
            'SELECT id, password FROM "Students"',
            {
                type: Sequelize.QueryTypes.SELECT
            }
        );

        for (let student of students) {

            const hashedPassword = await bcrypt.hash(
                student.password,
                Number(process.env.SALT)
            );

            await queryInterface.bulkUpdate(
                'Students',
                {
                    password: hashedPassword
                },
                {
                    id: student.id
                }
            );
        }
    },

    async down(queryInterface, Sequelize) {

    }
};