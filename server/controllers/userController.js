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
        throw new CustomError.NotFoundError('No user found');
    }
    res.status(statusCodes.StatusCodes.OK).json(user);

    } catch (error) {
        next(error)
    }
};

const getCurrentUser = async (req, res) => {
    console.log('getCurrentUser');
};

const updateUser = async (req, res) => {
    console.log('updateUser');
};

const updateUserPassword = async (req, res) => {
    console.log('updateUserPassword');
};

module.exports = {getAllUsers, getSingeUser, getCurrentUser, updateUser, updateUserPassword}

  