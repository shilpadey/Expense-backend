const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Expense = sequelize.define('expense',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNUll: false,
        primaryKey: true,
    },
    amount: {
        type: Sequelize.FLOAT,
        allowNUll: false,
    },
    description: {
        type: Sequelize.STRING,
        allowNUll: false,
    },
    category: {
        type: Sequelize.STRING,
        allowNUll: false
    }
});

module.exports = Expense;
