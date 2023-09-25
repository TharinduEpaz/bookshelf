const reviewModel = require("../models/reviews");
const bookModel = require("../models/book");
const userModel = require("../models/user");
const statusCodes = require("http-status-codes");
const CustomError = require("../errors");
const path = require("path");
const { get } = require("http");
const sequelize = require("sequelize");
const book = require("../models/book");

//define the relationship between user and review
userModel.hasMany(reviewModel)
reviewModel.belongsTo(userModel)

// reviewModel.sync({ force: true });

//functions

const addReview = async (req, res, next) => {

    const { bookId, rating, review } = req.body;
    const UserId = req.user.userId;

    //check if user has already reviewed the book
    const userReview = await reviewModel.findOne({
        where: {
            UserId: UserId,
            bookId: bookId
        }
    });

    if (userReview) {
        res.status(statusCodes.StatusCodes.BAD_REQUEST).json({ message: "You have already reviewed this book" });
        return;
    }

    const reviewObj = {
        bookId,
        UserId,
        rating,
        review
    }

    try{
    const reviewAdded = await reviewModel.create(reviewObj);
    const averageRating = await reviewModel.findAll({
        where: {
            bookId: bookId
        },
        attributes: [[sequelize.fn('AVG', sequelize.col('rating')), 'averageRating']],
        raw: true
    });

    //format average rating to 2 decimal places
    averageRating[0].averageRating = parseFloat(averageRating[0].averageRating).toFixed(2);

    bookModel.update({ averageRating: averageRating[0].averageRating }, {
        where: {
            id: bookId
        }
    });

    res.status(statusCodes.StatusCodes.CREATED).json({ message: "Review added successfully"});
    }

    catch(err){
        next(err);
    }

}

const getAllReviews = async (req, res, next) => {
    try {

    const reviews = await reviewModel.findAll();
    
    res.json(reviews);

    } catch (err) {
        next(err);
    }
}

const deleteReview = async (req, res, next) => {
    try {
        const reviewId = req.params.id;
        const review = await reviewModel.destroy({
            where: {
                id: reviewId
            }
        });

        res.json(review);

    } 
    catch (err) {
        next(err);
    }
}

const getReviewsByBookId = async (req, res, next) => {
    try {
        //get reviews with the profile names of the users who posted them
        const bookId = req.params.id;
        const reviews = await reviewModel.findAll({
            where: {
                bookId: bookId
            },
            include: [{
                model: userModel,
                attributes: ['firstName', 'lastName']
            }]
        });
        
        res.json(reviews);
    } catch (err) {
        next(err);
    } 
}

module.exports = {
    addReview,
    getAllReviews,
    deleteReview,
    getReviewsByBookId
}
