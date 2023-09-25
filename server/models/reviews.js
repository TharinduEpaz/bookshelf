const sequelize = require('./index.js').sequelize
const { DataTypes } = require("sequelize");


const review = sequelize.define('reviews', {
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


// review.sync({  force: true });



module.exports = review;
