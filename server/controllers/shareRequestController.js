const { Op, Sequelize } = require("sequelize");
const shareRequestModel = require("../models/shareRequests");
const orderModel = require("../models/order")
const statusCodes = require("http-status-codes");
const CustomError = require("../errors");
const path = require("path");
const { log } = require("console");

const getAllShareRequests = async (req, res, next) => {
  try {
    const shareRequests = await shareRequestModel.findAll();
    res.status(statusCodes.StatusCodes.OK).json(shareRequests);
  } catch (error) {
    next(error);
  }
};

const postShareRequest = async (req, res, next) => {
  try {
    
    const { id } = req.params;
    let { bookName, userName, details, listOfBooks, userId } = req.body;
    console.log(bookName, userName, details, listOfBooks, userId);
    listOfBooks = Array(listOfBooks);
    // const userId = req.user.userId;
    console.log(userId);

   
    if (!req.files) {
      throw new CustomError.BadRequestError("No file uploaded");
    }

    const image = req.files.bookImage;

    if (!image.mimetype.startsWith("image")) {
      throw new CustomError.BadRequestError("Please upload an image file");
    } 
    const maxSize = 1024 * 1024 * 5;
    if (image.size > maxSize) {
      throw new CustomError.BadRequestError(
        "Please upload an image less than 5MB"
      );
    }
    image.name = `image_${Math.floor(Math.random() * 10000000)}${
      path.parse(image.name).ext
    }`;
    const imagePath = path.join(
      __dirname,
      `../public/uploads/${image.name}`
    );
    await image.mv(imagePath);

    const shareRequest = await shareRequestModel.create({
      bookName,
      userName,
      details,
      listOfBooks,
      userId,
      image:'http://localhost:3000/uploads/'+image.name
    });
    res.status(statusCodes.StatusCodes.CREATED).json(shareRequest);
    // res.send("Add share request");
  } catch (error) {
    next(error);
  }
};



const getShareRequestNames = async (req, res, next) => {
  try {
    const shareRequests = await shareRequestModel.findAll({
      attributes: ["bookName"],
    });
    res.status(statusCodes.StatusCodes.OK).json(shareRequests);
  } catch (error) {
    next(error);
  }
};

const delete_books = async (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  try {
    const deletedBook = await shareRequestModel.destroy({
      where: { id: id },
    });

    if (deletedBook) {
      return res
        .status(statusCodes.StatusCodes.OK)
        .json({ message: "Book deleted successfully" });
    } else {
      return res
        .status(statusCodes.StatusCodes.OK)
        .json({ message: "Book not found" });
    }
  } catch (error) {
    console.log(error);
    console.error("Error deleting book:", error);
    return res
      .status(statusCodes.StatusCodes.OK)
      .json({ message: "Internal server error" });
  }
};

const check_Eligibility = async (req, res, next) => {
  //const id = req.user.userId;
  try {
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

    const orders = await orderModel.findAll({
      where: {
        [Op.and]: [
          {
            createdAt: {
              [Op.gte]: threeMonthsAgo,
            },
          },
          {
            user_id: "f1de8c33-cfc6-43b0-8d6b-39e0c47c6c0c",
          },
        ],
      },
    });
    console.log(orders);
    if (orders.length !=0) {
      res.send("OK");
    } else {
      res.send("NO");
    }
  } catch (error) {
    next(error);
  }
};


module.exports = {
  getAllShareRequests,
  postShareRequest,
  getShareRequestNames,
  delete_books,
  check_Eligibility
};
