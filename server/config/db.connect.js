const { Sequelize } = require('sequelize');

// module.exports = new Sequelize('railway', 'postgres', '46224-g5*C3155fADBbcC-*afBf6A5-E', {
//     dialect: 'postgres',
//     host: 'viaduct.proxy.rlwy.net',
//     port: 36656,
// });

module.exports = new Sequelize(
    process.env.PG_DATABASE,
    process.env.PGUSER,
    process.env.PGPASSWORD,
    {
        dialect: 'postgres',
        host: process.env.PGHOST,
        port: process.env.PGPORT,
    },
);
