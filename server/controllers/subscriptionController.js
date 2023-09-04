const subscriptionModel = require("../models/subscription");
const userSubscriptionModel = require("../models/userSubscription");
const subscriptionComplaint = require("../models/subscriptionComplaint");
const bookModel = require("../models/book");
const bookSubscriptionModel = require("../models/bookSubscription"); 
const statusCodes = require("http-status-codes");
const CustomError = require("../errors");
const path = require("path");
const {Op}=require("sequelize");

const getAllSubscriptions = async (req, res, next) => {

    try {
        
        const subscriptions = await subscriptionModel.findAll();
        res.status(statusCodes.StatusCodes.OK).json(subscriptions)

    } catch (error) {

        next(error)
    }
}

const addSubscriptionType = async (req, res, next) => {
	const userId =req.user.userId;
	// console.log(userId);
	try {
		const {
            subscriptionType
		} = req.body;

		
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
// const getAllSubscriptionDetails = async (req, res, next) => {
// 	try {
// 		const details = (await subscriptionDetailsModel.findAll());
// 		res.status(statusCodes.StatusCodes.OK).json(details);
// 	} catch (error) {
// 		next(error);
// 	}
// };

const getMySubscriptionDetails = async (req, res, next) => {
	const userId = req.user.userId;
	try {
		const details = await userSubscriptionModel.findAll({
			where: { userId },
			attributes: ["subscriptionType"],
		});
		if (!details) {
			throw new CustomError.NotFoundError("No current subscription");
		}
		res.status(statusCodes.StatusCodes.OK).json(details);
	} catch (error) {
		next(error);
	}
};

const updateMySubscription = async (req, res, next) => {
	const { subscriptionType} = req.body;
	const userId = req.user.userId;


	try {
		const details = await userSubscriptionModel.findAll({
			where: { userId },
			attributes: ["subscriptionType"],
		});
		if (!details) {
			throw new CustomError.NotFoundError("No current subscription");
		}
		// const updatedSubscription = await details.update(req.body);
		const response = await userSubscriptionModel.update(
			{ subscriptionType: subscriptionType },
			{
				where: {
					userId: userId
				},
				returning: true,
			}
		);
		
		res.status(statusCodes.StatusCodes.OK).json(response);
	} catch (error) {
		next(error);
	}
	// res.send("Update book" + id);
};

const addSubscriptionCompliant =async (req, res, next) => {
	try {
		const { email, name,complaint} = req.body;
		// const userId = req.user.userId;
		//console.log(userId);
		const addComplaint = await subscriptionComplaint.create({
			email,
			name,
			complaint
		});
		res.status(statusCodes.StatusCodes.CREATED).json(addComplaint);
		// res.send("Add complaint");
	} catch (error) {
		next(error);
	}

};


const deleteMySubscription = async (req, res, next) => {
	const userId = req.user.userId; // Assuming you can extract userId from the request

	try {
		// Delete the user's subscription
		const response = await userSubscriptionModel.update(
			{ subscriptionType: "No subscription" },
			{
				where: {
					userId: userId,
				},
				returning: true,
			}
		);

		if (response === 0) {
			// If no rows were affected, it means there was no subscription to delete
			throw new CustomError.NotFoundError(
				"No subscription found to delete"
			);
		}

		// Respond with a success message
		res.status(statusCodes.StatusCodes.OK).json({
			message: "Subscription deleted successfully",
		});
	} catch (error) {
		next(error);
	}
};

const getSingleBook = async (req, res, next) => {
	const { id } = req.params;
	try {
		const book = await bookModel.findOne({ where: { id } });
		if (!book) {
			throw new CustomError.NotFoundError("No book found");
		}
		res.status(statusCodes.StatusCodes.OK).json(book);
	} catch (error) {
		next(error);
	}
	// res.send("Get single book" + id);
};

const addBookSubscription = async (req, res, next) => {
	const userId = req.user.userId;
	try {
		const { id } = req.body;
		const bookExists = await bookSubscriptionModel.findOne({
			where: {
				[Op.and]: [
					{id: id},
					{userId: userId},
				],
			},
		});
		if (bookExists) {
			throw new Error("Book already exists");
		}

		const addBookSubscription = await bookSubscriptionModel.create({
			id,
			userId,
		});
		res.status(statusCodes.StatusCodes.CREATED).json(addBookSubscription);
		
	} catch (error) {
		next(error);
	}
};


module.exports = {
	getAllSubscriptions,
	getAllUserSubscriptions,
	addSubscriptionType,
	// getAllSubscriptionDetails,
	addSubscriptionCompliant,
	getMySubscriptionDetails,
	updateMySubscription,
	deleteMySubscription,
	getSingleBook,
	addBookSubscription,
};