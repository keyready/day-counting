const { DataTypes } = require('sequelize');
const DB = require('../../config/db.connect');

module.exports = DB.define(
    'users',
    {
        name: DataTypes.STRING,
        login: DataTypes.STRING,
        password: DataTypes.STRING,
    },
    {
        tableName: 'users',
        timestamps: false,
    },
);
