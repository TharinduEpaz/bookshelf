const bookModel = require("../models/book");
const statusCodes = require("http-status-codes");
const CustomError = require("../errors");
const path = require("path");
const {
  Op
} = require("sequelize");
const book = require("../models/book");
const {
  log
} = require("console");

const addBook = async (req, res, next) => {
  try {
    if (!req.files) {
      throw new CustomError.BadRequestError("No file uploaded");
    }

    let {
      title,
      author,
      price,
      ISBN,
      description,
      averageRating,
      stock,
      typesAvailable,
      genre,
      language,
      featuredCategory,
    } = req.body;



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

    const book = await bookModel.create({
      title,
      author,
      price,
      ISBN,
      description,
      averageRating,
      stock,
      typesAvailable,
      genre,
      language,
      featuredCategory,
      image: 'http://localhost:3000/uploads/' + bookImage.name,
    });

    //send notification to admin
    adminNotification.create({
      userId: user.id,
      type: "New Book Added",
      message: `${user.firstName} ${user.lastName} has registered.`
    })

    res.status(statusCodes.StatusCodes.CREATED).json(book);

  } catch (error) {
    next(error);
  }
  // res.send("Add book");
};

const getAllBooks = async (req, res, next) => {
  try {
    const books = await bookModel.findAll();
    res.json(books);
  } catch (error) {
    next(error);
  }
  // res.send("Get all books");
};

const getSingleBook = async (req, res, next) => {
  const {
    id
  } = req.params;
  try {
    const book = await bookModel.findOne({
      where: {
        id
      }
    });
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
  const {
    id
  } = req.params;
  try {
    const book = await bookModel.findOne({
      where: {
        id
      }
    });
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
  const {
    id
  } = req.params;
  try {
    const book = await bookModel.findOne({
      where: {
        id
      }
    });
    if (!book) {
      throw new CustomError.NotFoundError("No book found");
    }
    await book.destroy();
    res.status(statusCodes.StatusCodes.OK).json({
      message: "Book deleted"
    });
  } catch (error) {
    next(error);
  }
  // res.send("Delete book" + id);
};

const uploadImage = async (req, res, next) => {
  //   console.log(req.files);
  try {
    const {
      id
    } = req.params;

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
      .json({
        message: "Image uploaded",
        image: `/uploads/${bookImage.name}`
      });
  } catch (error) {
    next(error);
  }
};

//count All Books
const getBookCount = async (req, res, next) => {
  try {
    const bookCount = (await bookModel.count());
    res.json(bookCount);
  } catch (error) {
    next(error);
  }
};

//count In Stock Books
const getInStockBookCount = async (req, res, next) => {
  try {
    const bookCount = (await bookModel.count({
      where: {
        stock: {
          [Op.gt]: 0,
        },
      },
    }));
    res.json(bookCount);
  } catch (error) {
    next(error);
  }
};

const getBestSellingBooks = async (req, res, next) => {
  try {
    const bestSellingBooks = await orderModel.findAll({
      attributes: [
        "book_id",
        [sequelize.fn("COUNT", sequelize.col("book_id")), "count"],
      ],
      group: ["book_id"],
      order: [
        [sequelize.fn("COUNT", sequelize.col("book_id")), "DESC"]
      ],
      limit: 10,
      include: [{
        model: bookModel,
        attributes: [
          "title",
          "author",
          "price",
          "ISBN",
          "description",
          "averageRating",
          "stock",
          "typesAvailable",
          "genre",
          "language",
          "featuredCategory",
        ],
      }, ],
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
    const {
      quantity
    } = req.body.amount || 1;

    const book = await bookModel.findOne({
      where: {
        id
      }
    });

    if (!book) {
      throw new CustomError.NotFoundError("No book found");
    }
    book.stock = book.stock - quantity;
    await book.save();
    res.status(statusCodes.StatusCodes.OK).json(book);
  } catch (error) {
    next(error);
  }
};

const increaseStock = async (req, res, next) => {
  try {
    const id = req.body.bookId;
    const {
      quantity
    } = req.body.amount || 1;

    const book = await bookModel.findOne({
      where: {
        id
      }
    });
    if (!book) {
      throw new CustomError.NotFoundError("No book found");
    }
    book.stock = book.stock + quantity;
    await book.save();
    res.status(statusCodes.StatusCodes.OK).json(book);
  } catch (error) {
    next(error);
  }
};

const getBookNames = async (req, res, next) => {
  try {
    const books = await bookModel.findAll({
      attributes: ["id", "title"],
    });
    res.json(books);
  } catch (error) {
    next(error);
  }
};

const searchBooks = async (req, res, next) => {
  try {
    const {
      title
    } = req.body;
    const books = await bookModel.findAll({
      where: {
        title: {
          [Op.like]: `%${title}%`,
        },
      },
    });
    res.json(books);
  } catch (error) {
    next(error);
  }
};

const filterBooks = async (req, res, next) => {
  try {
    const {
      category
    } = req.params;

    if (category == 'New') {
      const books = await bookModel.findAll({
        order: [
          ["createdAt", "DESC"]
        ],
        limit: 10,
      });
      console.log(books);
      res.json(books);
    }


    const books = await bookModel.findAll({
      where: {
        genre: {
          [Op.like]: `%${category}%`,
        },
      },
    });
    console.log(books);
    res.json(books);

  } catch (error) {
    next(error);
  }
};

const getPaginatedBooks = async (req, res, next) => {
  //pagination
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  console.log(page, limit);

  //filters

  const price = req.query.price || false;
  const rating = parseInt(req.query.rating) || false;
  const genre = req.query.genre || false;
  const language = req.query.language || false;
  const stock = parseInt(req.query.stock) || false;

  console.log(price, rating, genre, language, stock);

  const startIndex = (page - 1) * limit;

  const results = {};

  const filters = {
    averageRating: rating,
    genre: genre,
    language: language,
  };

  if (stock) {
    filters.stock = {
      [Op.gt]: 0,
    };
  }

  if (stock == -1) {
    filters.stock = {
      [Op.eq]: 0,
    };
  }

  for (const key in filters) {
    if (
      filters[key] == 0 ||
      filters[key] == "null" ||
      filters[key] == undefined
    ) {
      delete filters[key];
    }
  }

  if (price != 0) {
    results.result = await bookModel.findAll({
      where: filters,
      offset: startIndex,
      limit: limit,
      order: [
        ["price", price]
      ], // Assuming 'price' is either 'ASC', 'DESC', or false
    });
  } else {
    results.result = await bookModel.findAll({
      where: filters,
      offset: startIndex,
      limit: limit,
    });
  }

  res.json(results);
};



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
  filterBooks,
  getPaginatedBooks,
  getBookCount,
  getInStockBookCount
};