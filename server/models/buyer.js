const sequelize = require('./index.js').sequelize
const { DataTypes } = require("sequelize");

const buyer = sequelize.define('buyer', {
    // Model attributes are defined here
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize.UUIDV4
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    province: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        defaultValue: false,
    },
    zipCode: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    // Other model options go here
})

// buyer.sync({  alter: true });

module.exports = buyer;