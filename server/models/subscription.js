const sequelize = require('./index.js').sequelize
const { DataTypes } = require("sequelize");

const subscription = sequelize.define('subsription', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    
}, {

    
});


module.exports = subscription;