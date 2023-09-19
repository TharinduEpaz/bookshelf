const bookModel = require("../models/book");
const orderModel = require("../models/order");
const orderBooksModel = require("../models/orderBooks");
const statusCodes = require("http-status-codes");
const CustomError = require("../errors");
const path = require("path");
const { Op } = require("sequelize");

const addBook = async (req, res, next) => {
  try {
    const {
      title,
      price,
      author,
      ISBN,
      description,
      averageRating,
      stock,
      typesAvailable,
      genre,
      language,
      featuredCategory,

    } = req.body;
    console.log('function reached');
    
    if (!title || !price || !author || !ISBN || !description || !typesAvailable || !genre) {
      throw new CustomError.BadRequestError("Please provide all required details");
    }

    const book = await bookModel.create({
      title,
      price,
      author,
      ISBN,
      description,
      averageRating,
      stock,
      typesAvailable,
      genre,
      language,
      featuredCategory,
    });
    res.status(statusCodes.StatusCodes.CREATED).json(book);
  } catch (error) {
    next(error);
  }
  // res.send("Add book");
};

const getAllBooks = async (req, res, next) => {
  try {
    const books = (await bookModel.findAll());
    res.json(books);
  } catch (error) {
    next(error);
  }
  // res.send("Get all books");
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

const updateBook = async (req, res, next) => {
  const { id } = req.params;
  try {
    const book = await bookModel.findOne({ where: { id } });
    if (!book) {
      throw new CustomError.NotFoundError("No book found");
    }
    const updatedBook = await book.update(req.body);
    res.status(statusCodes.StatusCodes.OK).json(updatedBook);
  } catch (error) {
    next(error);
  }
  // res.send("Update book" + id);
};

const deleteBook = async (req, res, next) => {
  const { id } = req.params;
  try {
    const book = await bookModel.findOne({ where: { id } });
    if (!book) {
      throw new CustomError.NotFoundError("No book found");
    }
    await book.destroy();
    res.status(statusCodes.StatusCodes.OK).json({ message: "Book deleted" });
  } catch (error) {
    next(error);
  }
  // res.send("Delete book" + id);
};

const uploadImage = async (req, res, next) => {
//   console.log(req.files);
  try {
    const { id } = req.params;

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
  } catch (error) {
    next(error);
  }
};

const getBestSellingBooks = async (req, res, next) => {
  try {
  const bestSellingBooks = await orderModel.findAll({
    attributes: ['book_id', [sequelize.fn('COUNT', sequelize.col('book_id')), 'count']],
    group: ['book_id'],
    order: [[sequelize.fn('COUNT', sequelize.col('book_id')), 'DESC']],
    limit: 10,
    include: [{
      model: bookModel,
      attributes: ['title', 'author', 'price', 'ISBN', 'description', 'averageRating', 'stock', 'typesAvailable', 'genre', 'language', 'featuredCategory']
    }]
  });
  res.json(bestSellingBooks);
  } catch (error) {
    next(error);
  }
  // res.send("Get all books");
};

const decreaseStock = async (req, res, next) => {
  try {

    const id = req.body.bookId;
    const { quantity } = req.body.amount || 1;

    const book = await bookModel.findOne({ where: { id } });
    
    if (!book) {
      throw new CustomError.NotFoundError("No book found");
    }
    book.stock = book.stock - quantity;
    await book.save();
    res.status(statusCodes.StatusCodes.OK).json(book);
  } catch (error) {
    next(error);
  }
}

const increaseStock = async (req, res, next) => {
  try {

    const  id  = req.body.bookId;
    const { quantity } = req.body.amount || 1;

    const book = await bookModel.findOne({ where: { id } });
    if (!book) {
      throw new CustomError.NotFoundError("No book found");
    }
    book.stock = book.stock + quantity;
    await book.save();
    res.status(statusCodes.StatusCodes.OK).json(book);
  } catch (error) {
    next(error);
  }
}

const getBookNames = async (req, res, next) => {
  try {
    
    const books = await bookModel.findAll({
      attributes: ['id','title']
    });
    res.json(books);
  } catch (error) {
    next(error);
  }
}

const searchBooks = async (req, res, next) => {
  try {
    const { title } = req.body;
    const books = await bookModel.findAll({
      where: {
        title: {
          [Op.like]: `%${title}%`
        }
      }
    });
    res.json(books);
  } catch (error) {
    next(error);
  }
}






module.exports = {
  addBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
  uploadImage,
  getBestSellingBooks,
  decreaseStock,
  increaseStock,
  getBookNames,
  searchBooks,
};
