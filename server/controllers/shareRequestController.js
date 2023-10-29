const shareRequestModel = require("../models/shareRequests");
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
    const { bookName, userName, details, listOfBooks, userId } =
      req.body;
    // const userId = req.user.userId;
    console.log(userId);

    if (!req.files) {
      throw new CustomError.BadRequestError("No file uploaded");
    }
    const bookImage = req.files.image;

    if (!bookImage.mimetype.startsWith("image")) {
      throw new CustomError.BadRequestError("Please upload an image file");
    }

    const maxSize = 1024 * 1024 * 5;

    if (bookImage.size > maxSize) {
      throw new CustomError.BadRequestError(
        "Please upload an image less than 5MB"
      );
    }

    //randomize file name
    bookImage.name = `image_${Math.floor(Math.random() * 10000000)}${
      path.parse(bookImage.name).ext
    }`;

    const imagePath = path.join(
      __dirname,
      `../public/uploads/${bookImage.name}`
    );

    await bookImage.mv(imagePath);

    res
      .status(statusCodes.StatusCodes.OK)
      .json({ message: "Image uploaded", image: `/uploads/${bookImage.name}` });

    const shareRequest = await shareRequestModel.create({
      bookName,
      userName,
      details,
      listOfBooks,
      userId,
      imagePath
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

module.exports = {
  getAllShareRequests,
  postShareRequest,
  getShareRequestNames,
  delete_books,
};
