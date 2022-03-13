'use strict'


const food = (sequelize, DataTypes) => sequelize.define('food', {
    favFood: {
        type: DataTypes.STRING,
        allowNull: false
    },
    calories: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = food;