const subscriptionModel = require("../models/subscription");
const userSubscriptionModel = require("../models/userSubscription");
const statusCodes = require("http-status-codes");
const CustomError = require("../errors");
const path = require("path");

const getAllSubscriptions = async (req, res, next) => {

    try {
        
        const subscriptions = await subscriptionModel.findAll();
        res.status(statusCodes.StatusCodes.OK).json(subscriptions)

    } catch (error) {

        next(error)
        
    }

}
const getAllUserSubscriptions = async (req, res, next) => {
	try {
		const userSubscriptions = await userSubscriptionModel.findAll();
		res.status(statusCodes.StatusCodes.OK).json(userSubscriptions);
	} catch (error) {
		next(error);
	}
};



module.exports = {getAllSubscriptions, getAllUserSubscriptions };