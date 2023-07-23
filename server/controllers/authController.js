const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const statusCodes = require("http-status-codes");
const CustomError = require("../errors");
const { attachCookiesToResponse } = require("../utils/jwt");



const login = async (req, res, next) => {
  try {
    //destructuring email and password 
    const { email, password } = req.body;

    //check if email and password are provided
    if (!email || !password)
      throw new CustomError.BadRequestError(
        "Please provide email and password"
      );

    //check if user exists in the database
    const user = await userModel.findOne({
      where: {
        email: email,
      },
    });

    //if user does not exist throw error
    if (user === null) {
      throw new CustomError.UnauthenticatedError("Invalid Credentials");
    }

    //if user exists check if password is correct
    if (await bcrypt.compare(req.body.password, user.password)) {
      const tokenUser = {
        name: user.firstName,
        userId: user.id,
        email: user.email,
        role: user.role,
      };
      //attach cookies to response and send response
      attachCookiesToResponse(res, { user: tokenUser });
      res.status(statusCodes.StatusCodes.OK).json({ user: tokenUser });
    } else {
      //if password is incorrect throw error
      throw new CustomError.UnauthenticatedError("Invalid Credentials");
    }
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const email = req.body.email;
    const emailExists = await userModel.findOne({
      where: {
        email: email,
      },
    });
    if (emailExists) {
      throw new Error("Email Already Exists");
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await userModel.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
    });

    const tokenUser = {
      name: user.firstName,
      userId: user.id,
      email: user.email,
    };

    attachCookiesToResponse(res, { user: tokenUser });

    res.status(statusCodes.StatusCodes.CREATED).json({ user: tokenUser });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(statusCodes.StatusCodes.OK).json({ message: "Logged Out" });
}



module.exports = {

  register,
  login,
  logout
};
