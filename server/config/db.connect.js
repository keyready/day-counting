const { Sequelize } = require('sequelize');

module.exports = new Sequelize('day-counter', 'keyready', 'userSQL', {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
});
