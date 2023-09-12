const subscriptionModel = require("../models/subscription");
const userSubscriptionModel = require("../models/userSubscription");
const subscriptionComplaint = require("../models/subscriptionComplaint");
const bookModel = require("../models/book");
// const bookSubscriptionModel = require("../models/bookSubscription");
const statusCodes = require("http-status-codes");
const CustomError = require("../errors");
const path = require("path");
const { Op, Sequelize } = require("sequelize");
const { log } = require("console");
const { sequelize } = require("../models");


//define the many to many relationship between books and subscriptions

userSubscriptionModel.belongsToMany(bookModel, {foreignKey:"userId", through: 'bookSubscription' });
bookModel.belongsToMany(userSubscriptionModel, {foreignKey:"bookId", through: 'bookSubscription' });

// userSubscriptionModel.sync({ alter: true });
// bookModel.sync({ alter: true });
// sequelize.sync();
// bookSubscriptionModel.sync({ force: true });

const getAllSubscriptions = async (req, res, next) => {
  try {
    const subscriptions = await subscriptionModel.findAll();
    res.status(statusCodes.StatusCodes.OK).json(subscriptions);
  } catch (error) {
    next(error);
  }
};

const addSubscriptionType = async (req, res, next) => {
  const userId = req.user.userId;
  // console.log(userId);
  try {
    const { subscriptionType } = req.body;

    //check if a subscription already exists and update it if exists

    const subscriptionExists = await userSubscriptionModel.findOne({
      where: {
        userId: userId,
      },
    });

    if (subscriptionExists) {
      const response = await userSubscriptionModel.update(
        { subscriptionType: subscriptionType },
        {
          where: {
            userId: userId,
          },
          returning: true,
        }
      );
      return res.status(statusCodes.StatusCodes.OK).json(response);
    }
    else {
      const type = await userSubscriptionModel.create({
        subscriptionType,
        userId,
      });
      return res.status(statusCodes.StatusCodes.CREATED).json(type);
    }

  } catch (error) {
    next(error);
  }
  // res.send("");
};

const getAllUserSubscriptions = async (req, res, next) => {
  try {
    const userSubscriptions = await userSubscriptionModel.findAll();
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
  const { subscriptionType } = req.body;
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
          userId: userId,
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

const addSubscriptionCompliant = async (req, res, next) => {
  try {
    const { email, name, complaint } = req.body;
    // const userId = req.user.userId;
    //console.log(userId);
    const addComplaint = await subscriptionComplaint.create({
      email,
      name,
      complaint,
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
		{ subscriptionType: "No Subscription" },
		{
			where: {
				userId: userId,
			},
			returning: true,
		}
	);

    if (response === 0) {
      // If no rows were affected, it means there was no subscription to delete
      throw new CustomError.NotFoundError("No subscription found to delete");
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
  console.log(userId);
  try {
    const { id } = req.body;
    const bookId = id;
    console.log(bookId, userId);
    // const bookExists = await bookSubscriptionModel.findOne({
    //   where: {
    //     [Op.and]: [{ id: id }, { userId: userId }],
    //   },
    // });
    
    // if () {
    //   throw new Error("Book already exists");
    // }

    // const addBookSubscription = await bookSubscriptionModel.create({
    //   id,
    //   userId,
    // });
    // res.status(statusCodes.StatusCodes.CREATED).json(addBookSubscription);
    // const response = await bookSubscriptionModel.addBook(bookId, userId)
    const subscription = await userSubscriptionModel.findOne({
      where: {
        userId: userId,
      },
    });
    if(!subscription){
      throw new CustomError.NotFoundError("No subscription found");
    }

    const book = await bookModel.findOne({
      where: {
        id: bookId,
      },

    });
    // res.json(book);

    if(!book){
      throw new CustomError.NotFoundError("No book found");
    }

    //add book to subscription
    const response = await subscription.addBook(book);


    
    res.json(response);
    

    // res.status(statusCodes.StatusCodes.CREATED).json(response);
    
  } catch (error) {
    next(error);
  }
};

const add_book_to_a_subscription_plan = async (req, res, next) => {
  const userId = req.user.userId;
  
  try {
    const { id } = req.body;
    const bookId = id;
    console.log(bookId, userId);

    const subscription = await userSubscriptionModel.findOne({
      where: {
        userId: userId,
      },
    });
    if(!subscription){
      throw new CustomError.NotFoundError("No subscription found");
    }
    const book = await bookModel.findOne({
      where: {
        id: bookId,
      },

    });

    if(!book){
      throw new CustomError.NotFoundError("No book found in this name");
    }

    //add book to subscription
    const response = await subscription.addBook(book);
    res.json(response);
  }
  

  



    // const bookExists = await bookSubscriptionModel.findOne({
    //   where: {
    //     [Op.and]: [{ id: id }, { userId: userId }],
    //   },

  
  catch (error) {
    next(error);
  }
};

const checkSubscription = async (req, res, next) => {
  // const uId = "d384f58e-ee9a-48eb-8c96-141e66f6af60";
  const uId = req.user.userId;
  console.log(uId);
  try {
    const subscription = await userSubscriptionModel.findOne({
      where: {
        userId: uId,
      },
    });

    if (!subscription) {
      // res.send("No Subscription Found");
    }
    
    res.status(statusCodes.StatusCodes.OK).json(subscription);

  } catch (error) {
    next(error);
  }
};

const get_books_in_subscription_plan = async (req, res, next) => {
	try {
		//get selectBooks with the users who selected them
     const userId = req.user.userId;
		// const selectBooks = await bookSubscriptionModel.findAll({
		// 	where: {
		// 		userId: userId,
		// 	},
		// 	include: [
		// 		{
		// 			model: bookModel,
		// 			attributes: ["title", "price","author","averageRating","image"],
		// 		},
		// 	],
		// });

    const books = await userSubscriptionModel.findAll({
      where: {
        userId: userId,
      },
      include: [
        {
          model: bookModel,
          attributes: ["title", "price","author","averageRating","image"],
        },
      ],
    });

		res.json(books);
	} catch (err) {
		next(err);
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
	checkSubscription,
  add_book_to_a_subscription_plan,
  get_books_in_subscription_plan,
};
