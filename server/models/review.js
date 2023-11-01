const sequelize = require('./index.js').sequelize
const { DataTypes } = require("sequelize");
const user = require('./user.js')

const review = sequelize.define('review', {
    bookId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    review: {
        type: DataTypes.STRING,
        allowNull: false
    },
  
}, {
    // Other model options go here
})




//relationship between book and review
// review.belongsTo(book, {foreignKey: 'bookId'})
// book.hasMany(review, {foreignKey: 'bookId'})

// relationship between user and review
review.belongsTo(user, {foreignKey: 'userId'})
user.hasMany(review, {foreignKey: 'userId'})

//one user can review a book only once
// review.belongsTo(user, {foreignKey: 'userId', unique: true})
// user.hasMany(review, {foreignKey: 'userId'})


// review.sync({  alter: true });

module.exports = review;
