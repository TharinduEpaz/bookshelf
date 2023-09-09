const sequelize = require('./index.js').sequelize
const { DataTypes } = require("sequelize");

const orderBooks = sequelize.define('orderBooks', {
    // Model attributes are defined here
    orderId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    bookId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price : {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    // Other model options go here
    timestamps: false
})

// orderBooks.sync({ force: true })
   

