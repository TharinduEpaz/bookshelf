const sequelize = require('./index.js').sequelize
const { DataTypes } = require("sequelize");
const validator = require('validator');

const userNotifications = sequelize.define('userNotifications', {
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
    type: { //error success warning
        type: DataTypes.STRING,
        allowNull: false
    },
    cause:{
        type: DataTypes.STRING,
        allowNull: false

    },
    message: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    // Other model options go here

})


// userNotifications.sync({  alter: true });

module.exports = userNotifications;