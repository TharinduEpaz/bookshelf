const sequelize = require('./index.js').sequelize
const { DataTypes } = require("sequelize");

const review = sequelize.define('review', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize.UUIDV4
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    review: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bookId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false
    }
}, {
    // Other model options go here
})
//relationship between book and review
// review.belongsTo(book, {foreignKey: 'bookId'})
// book.hasMany(review, {foreignKey: 'bookId'})

// relationship between user and review
// review.belongsTo(user, {foreignKey: 'userId'})
// user.hasMany(review, {foreignKey: 'userId'})

//one user can review a book only once
review.belongsTo(user, {foreignKey: 'userId', unique: true})
user.hasMany(review, {foreignKey: 'userId'})


// review.sync({  alter: true });

module.exports = review;