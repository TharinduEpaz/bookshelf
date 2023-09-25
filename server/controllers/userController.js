const userModel = require("../models/user");
const notificationModel = require("../models/userNotifications");
const orderModel = require("../models/order");
const subscriptionModel = require("../models/subscription");
const buyerModel = require("../models/buyer");

//relationship between user and buyer

userModel.hasOne(buyerModel)
buyerModel.belongsTo(userModel)

// buyerModel.sync({force:true})


/////////////////////////////


const bcrypt = require("bcrypt");
const statusCodes = require("http-status-codes");
const CustomError = require("../errors");

const getAllUsers = async (req, res) => {
  const users = await userModel.findAll();
  res.json(users);
};

const getSingeUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userModel.findOne({ where: { id } });
    if (!user) {
      throw new CustomError.NotFoundError("No user found");
    }
    res.status(statusCodes.StatusCodes.OK).json(user);
  } catch (error) {
    next(error);
  }
};

const getCurrentUser = async (req, res) => {
  res.status(statusCodes.StatusCodes.OK).json(req.user);
};


const updateUserPassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      throw new CustomError.BadRequestError(
        "Please provide old and new password"
      );
    }

    if (oldPassword === newPassword) {
      throw new CustomError.BadRequestError(
        "New password cannot be the same as old password"
      );
    }

    const { userId } = req.user;
    const user = await userModel.findOne({ where: { id: userId } });

    const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordCorrect) {
      throw new CustomError.UnauthenticatedError("Invalid credentials");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await userModel.update(
      { password: hashedPassword },
      { where: { id: userId } }
    );
    res
      .status(statusCodes.StatusCodes.OK)
      .json({ message: "Password updated successfully" });
  } catch (error) {
    next(error);
  }
};

const getNotifications = async (req, res, next) => {
  const notifications = await notificationModel.findAll({
    where: { userId: req.params.id },
  });
  console.log(notifications);
  res.status(statusCodes.StatusCodes.OK).json(notifications);
};

const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await userModel.findOne({ where: { id } });
    if (!user) {
      throw new CustomError.NotFoundError("No user found");
    }
    await user.destroy();
    res.status(statusCodes.StatusCodes.OK).json({ message: "User deleted" });
  } catch (error) {
    next(error);
  }
  // res.send("Delete book" + id);
};

const updateUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await userModel.findOne({ where: { id } });
    if (!user) {
      throw new CustomError.NotFoundError("No user found");
    }
    const updatedUser = await user.update(req.body);
    res.status(statusCodes.StatusCodes.OK).json(updatedUser);
  } catch (error) {
    next(error);
  }
  // res.send("Update user" + id);
};

const addUser = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      emailVerified,
      role
    } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with hashedPassword
    const user = await userModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword, 
      emailVerified,
      role
    });

    res.status(statusCodes.StatusCodes.CREATED).json(user);
  } catch (error) {
    next(error);
  }
};

const userDashboard = async (req, res, next) => {
  try {
    const { userId } = req.user;

    //get orders count
    const ordersCount = await orderModel.count({
      where: {
        UserId: userId,
      },
    });

    //get shipping address
    const buyerDetails = await buyerModel.findOne({
      where: {
        UserId: userId,
      },
    });

    res.json({ ordersCount : ordersCount, buyerDetails: buyerDetails });

  } catch (error) {
    next(error);
  }
};

const changeShippingDetails = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { address, city, zipCode, phone, province } = req.body;
    const buyer = await buyerModel.findOne({
      where: {
        UserId: userId,
      },
    });

    if(!buyer){
      throw new CustomError.NotFoundError("No buyer found");
    }
    //update buyer with the details
    const updatedBuyer = await buyer.update({
      address: address,
      city: city,
      zipCode: zipCode,
      phoneNumber: phone,
      province: province
    }, {
      where: {
        UserId: userId
      }
    }); 
      

    res.status(statusCodes.StatusCodes.OK).json(updatedBuyer);

  }
  catch (error) {
    next(error);
  }
}





module.exports = {
  getAllUsers,
  getSingeUser,
  getCurrentUser,
  updateUser,
  updateUserPassword,
  getNotifications,
  deleteUser,
  addUser,
  updateUser,
  userDashboard,
  changeShippingDetails,
};
