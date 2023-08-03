const sequelize = require('./index.js').sequelize
const { DataTypes } = require("sequelize");

const book = sequelize.define('book', {
    // Model attributes are defined here
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize.UUIDV4
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ISBN : {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description : {
        type: DataTypes.STRING,
        allowNull: false
    },
    averageRating : {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    inventory: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    //types means paperback, hardcover, etc
    typesAvailable: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    },
    //genres means fiction, non-fiction, etc
    genre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    language: {
        type: DataTypes.STRING,
        allowNull: true
    },
    featuredCategory: {
        type: DataTypes.STRING,
        allowNull: true
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'uploads/default.jpeg'
    },
}, {
    // Other model options go here
}) 

// book.sync({  alter: true });

module.exports = book;
