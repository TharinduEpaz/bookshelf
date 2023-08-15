const subscriptionModel = require("../models/subscription");
const userSubscriptionModel = require("../models/userSubscription");
const subscriptionDetailsModel = require("../models/subscriptionDetails");
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

const addSubscriptionType = async (req, res, next) => {
	try {
		const {
            subscriptionType
		} = req.body;

		const userId = req.user.userId;
		const type = await userSubscriptionModel.create({
		
			userId,
			subscriptionType,
		});
		res.status(statusCodes.StatusCodes.CREATED).json(type);
	} catch (error) {
		next(error);
	}
	// res.send("");
};

const getAllUserSubscriptions = async (req, res, next) => {
	try {
		const userSubscriptions = (await userSubscriptionModel.findAll());
		res.status(statusCodes.StatusCodes.OK).json(userSubscriptions);
	} catch (error) {
		next(error);
	}
};
const getAllSubscriptionDetails = async (req, res, next) => {
	try {
		const details = (await subscriptionDetailsModel.findAll());
		res.status(statusCodes.StatusCodes.OK).json(details);
	} catch (error) {
		next(error);
	}
};


module.exports = {
	getAllSubscriptions,
	getAllUserSubscriptions,
	addSubscriptionType,
	getAllSubscriptionDetails
};