const sequelize = require('./index.js').sequelize
const { DataTypes } = require("sequelize");

const donationRequest = sequelize.define('donationRequest', {

    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
    },

})


// donationRequest.sync({  alter: true });

module.exports = donationRequest;