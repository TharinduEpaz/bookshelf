const sequelize = require('./index.js').sequelize
const { DataTypes } = require("sequelize");

const buyer = sequelize.define('buyer', {
    // Model attributes are defined here
  
    address: {
        type: DataTypes.STRING,
        allowNull: true
    },
    province: {
        type: DataTypes.STRING,
        allowNull: true
    },
    city: {
        type: DataTypes.STRING,
        defaultValue: true,
    },
    zipCode: {
        type: DataTypes.STRING,
        allowNull: true
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, {
    // Other model options go here
})

// buyer.sync({  alter: true });


module.exports = buyer;