const Sequelize = require('sequelize');

const sequelize = new Sequelize('expense-tracker', 'root', 'hsrokz786', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;