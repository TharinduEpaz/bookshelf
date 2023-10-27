const sequelize = require('./index.js').sequelize
const { DataTypes } = require("sequelize");
const validator = require('validator');

const adminNotifications = sequelize.define('adminNotifications', {
    // Model attributes are defined here
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 0
    }
}, {
    // Other model options go here

})


// adminNotifications.sync({  alter: true });

module.exports = adminNotifications;