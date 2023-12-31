const { DataTypes } = require('sequelize');
const DB = require('../../config/db.connect');

module.exports = DB.define(
    'counter',
    {
        hostId: DataTypes.INTEGER,
        hostName: DataTypes.STRING,
        date: DataTypes.DATE,
        title: DataTypes.STRING,
        isPrivate: DataTypes.BOOLEAN,
    },
    {
        tableName: 'counter',
        timestamps: false,
    },
);
