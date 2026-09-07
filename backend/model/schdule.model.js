const { sequelize } = require('../config/database.config');
const { DataTypes } = require('sequelize');

const Schedule = sequelize.define('Schedule', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },

    courses_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    },

    classroom_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    },

    start_time: {
        type: DataTypes.BIGINT,
        allowNull: false
    },

    finish_time: {
        type: DataTypes.BIGINT,
        allowNull: false
    },

    day: {
        type: DataTypes.BIGINT,
        allowNull: false
    }

}, {
    tableName: 'schedules',
    timestamps: true
});

module.exports = { Schedule };