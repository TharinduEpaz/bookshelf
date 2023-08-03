const userModel = require("../models/user");
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

module.exports = {
  getAllUsers,
  getSingeUser,
  getCurrentUser,
  updateUser,
  updateUserPassword,
};
