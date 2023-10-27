const sequelize = require('./index.js').sequelize
const { DataTypes } = require("sequelize");

const shareRequest = sequelize.define('shareRequest', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize.UUIDV4
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: true
    },

    bookName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    details: {
        type: DataTypes.STRING,
        allowNull: false
    },
    listOfBooks: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        // type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false
    }
}, {
    // Other model options go here
})

// shareRequest.sync({  alter: true });

module.exports = shareRequest;
