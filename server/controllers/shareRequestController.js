const shareRequestModel = require("../models/shareRequests");
const orderModel = require("../models/order");
const statusCodes = require("http-status-codes");
const CustomError = require("../errors");
const path = require("path");
const { log } = require("console");
const Sequelize = require("sequelize");
const Op = Sequelize.Op; // Sequelize's operators

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
    let { bookName, userName, details, listOfBooks, userId } = req.body;
    console.log(bookName, userName, details, listOfBooks, userId);
    listOfBooks = Array(listOfBooks)
    // const userId = req.user.userId;
    console.log(userId);

    const image = req.files;
    console.log(image);

    const shareRequest = await shareRequestModel.create({
      bookName,
      userName,
      details,
      listOfBooks,
      userId,
    });
    res.status(statusCodes.StatusCodes.CREATED).json(shareRequest);
    // res.send("Add share request");
  } catch (error) {
    next(error);
  }
};

const postShareRequestImage = async (req, res, next) => {
  // try {
  //     const { id } = req.params;
  //     if (!req.files) {
  //       throw new CustomError.BadRequestError("No file uploaded");
  //     }
  //     const bookImage = req.files.image;
  //     if (!bookImage.mimetype.startsWith("image")) {
  //       throw new CustomError.BadRequestError("Please upload an image file");
  //     }
  //     const maxSize = 1024 * 1024 * 5;
  //     if (bookImage.size > maxSize) {
  //       throw new CustomError.BadRequestError(
  //         "Please upload an image less than 5MB"
  //       );
  //     }
  //     //randomize file name
  //     bookImage.name = `image_${Math.floor(Math.random() * 10000000)}${
  //       path.parse(bookImage.name).ext
  //     }`;
  //     const imagePath = path.join(
  //       __dirname,
  //       `../public/uploads/${bookImage.name}`
  //     );
  //     await bookImage.mv(imagePath);
  //     await shareRequestModel.update({ image: bookImage.name }, { where: { id } });
  //     res
  //       .status(statusCodes.StatusCodes.OK)
  //       .json({ message: "Image uploaded", image: `/uploads/${bookImage.name}` });
  //   } catch (error) {
  //     next(error);
  //   }
};

const checkEligibility = async (req, res, next) => {
  const id = req.user.userId;
  try {
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

    const orders = await orderModel.findAll({
      where: {
        createdAt: {
          [Op.gte]: threeMonthsAgo,
        },
      },
    });
    if (orders) {
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
  checkEligibility,
};
