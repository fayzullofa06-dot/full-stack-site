const { sequelize } = require('../config/database.config');
const { DataTypes } = require('sequelize');

const Classroom = sequelize.define('Classroom', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },

    building: {
        type: DataTypes.BIGINT,
        allowNull: false
    },

    room_number: {
        type: DataTypes.BIGINT,
        allowNull: false
    },

    capacity: {
        type: DataTypes.BIGINT,
        allowNull: false
    },

    room_type: {
        type: DataTypes.BIGINT,
        allowNull: false
    }

}, {
    tableName: 'classroom',
    timestamps: true
});

module.exports = { Classroom };