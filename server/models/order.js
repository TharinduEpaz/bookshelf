const sequelize = require('./index.js').sequelize
const { DataTypes } = require("sequelize");

const order = sequelize.define('order', {
    // Model attributes are defined here
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize.UUIDV4
    },
    orderDate: {
        type: DataTypes.DATE,
        defaultValue: sequelize.NOW,
        allowNull: false
    },
    orderStatus: {
        type: DataTypes.STRING,
        defaultValue: 'pending',
        allowNull: false
    },
    totalPrice: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    buyer_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
}, {
    // Other model options go here  
})