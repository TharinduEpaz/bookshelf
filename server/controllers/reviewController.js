const reviewModel = require("../models/review");
const statusCodes = require("http-status-codes");
const CustomError = require("../errors");
const path = require("path");

const addReview = async (req, res, next) => {

    const { bookId, rating, review } = req.body;
    const userId = req.user.userId;

    const reviewObj = {
        bookId,
        userId,
        rating,
        review
    }

    const reviewAdded = await reviewModel.create(reviewObj);
    
    res.status(statusCodes.StatusCodes.CREATED).json({ message: "Review added successfully" });
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
    } catch (err) {
        next(err);
    }
}

module.exports = {
    addReview,
    getAllReviews,
    deleteReview
}
