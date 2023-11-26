const { Sequelize } = require('sequelize');

module.exports = new Sequelize('day-counter', 'postgres', 'UserSQL', {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
});
