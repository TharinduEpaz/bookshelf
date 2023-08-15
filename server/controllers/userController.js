const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const statusCodes = require("http-status-codes");
const CustomError = require("../errors");


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



const getAllUsers = async (req, res, next) => {
  try {
    const { role } = req.query;
    const whereClause = role && role !== 'All' ? { role } : {}; // Check for undefined or 'All'

    const users = await userModel.findAll({ where: whereClause });
    res.json(users);
  } catch (error) {
    next(error);
  }
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

const updateUser = async (req, res) => {
  console.log("updateUser");
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


module.exports = {
  addUser,
  getAllUsers,
  getSingeUser,
  getCurrentUser,
  updateUser,
  updateUserPassword,
  deleteUser
};
