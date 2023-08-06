const sequelize = require('./index.js').sequelize
const { DataTypes } = require("sequelize");

const buyer = sequelize.define('donation', {
    