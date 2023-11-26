const { DataTypes } = require('sequelize');
const DB = require('../../config/db.connect');

module.exports = DB.define(
    'counter',
    {
        hostId: DataTypes.INTEGER,
        date: DataTypes.DATE,
        title: DataTypes.STRING,
    },
    {
        tableName: 'counter',
        timestamps: false,
    },
);
