const sequelize = require('./index.js').sequelize
const { DataTypes } = require("sequelize");

const subscription = sequelize.define('subscription', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    book_count: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    time_period: {
        type: DataTypes.STRING,
        allowNull: false
    }

}, {

    
});

// subscription.sync({ alter: true });


module.exports = subscription;