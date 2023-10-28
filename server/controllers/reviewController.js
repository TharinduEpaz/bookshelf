const reviewModel = require("../models/review");
const userModel = require("../models/user")
const statusCodes = require("http-status-codes");
const CustomError = require("../errors");
const path = require("path");

const addReview = async (req, res, next) => {

    const { bookId, rating, review } = req.body;
    const userId = req.user.userId;

    //check if user has already reviewed the book
    const userReview = await reviewModel.findOne({
        where: {
            userId: userId,
            bookId: bookId
        }
    });

    if (userReview) {
        res.status(statusCodes.StatusCodes.BAD_REQUEST).json({ message: "You have already reviewed this book" });
        return;
    }

    const reviewObj = {
        bookId,
        userId,
        rating,
        review
    }

    try{
    const reviewAdded = await reviewModel.create(reviewObj);
    res.status(statusCodes.StatusCodes.CREATED).json({ message: "Review added successfully" });
    }

    catch(err){
        next(err);
    }

}

const getAllReviews = async (req, res, next) => {
    try {

    const reviews = await reviewModel.findAll({
        include: userModel
    });
    console.log(reviews);    
    res.json(reviews);

    } catch (err) {
        next(err);
    }
}

const getReviewsByBook = async (req,res,next) => {
    const id = req.params;
    try {

        const reviews = await reviewModel.findAll({
            where:{
            bookId:id
            }
        },{
            include: userModel
        });
        console.log(reviews);    
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

module.exports = {
    addReview,
    getAllReviews,
    deleteReview
}
