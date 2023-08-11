const userModel = require("../models/user");
const notification = require("../models/userNotifications");
const bcrypt = require("bcrypt");
const statusCodes = require("http-status-codes");
const CustomError = require("../errors");
const { attachCookiesToResponse } = require("../utils/jwt");
const sendMail = require('../utils/sendMail');
require("dotenv").config();

const jwt = require('jsonwebtoken');

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
        name: user.firstName + " " + user.lastName,
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

    //validate the data
    if (!user) {
      throw new Error("Invalid Data");
    }

    //check if name contains digits or special characters
    if (/\d/.test(user.firstName) || /\d/.test(user.lastName)) {
      throw new Error("Name cannot contain digits or special characters");
    }
    

    const tokenUser = {
      name: user.firstName,
      userId: user.id,
      email: user.email,
    };

    attachCookiesToResponse(res, { user: tokenUser });

    //send notification to user to confirm email
    notification.create({
      userId: user.id,
      type: "warning",
      message: "Please Confirm your email address to activate your account to access our all features",
      cause: "email verification",
    });

    //send email to user to confirm email

    jwt.sign(
      {
        user: user.id,
      },
      process.env.EMAIL_SECRET,
      {
        expiresIn: "1d",
      },
      (err, emailToken) => {
        const url = `http://localhost:3000/api/v1/verifyEmail/${emailToken}`;
        sendMail(user.email, "Verify Email", `Please click this email to confirm your email: <a href="${url}">${url}</a>`);
      }
    )

    res.status(statusCodes.StatusCodes.CREATED).json({ user: tokenUser });
  } catch (error) {
    //delete created user if exists
    await userModel.destroy({
      where: {
        email: req.body.email,
      },
    });
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

const verifyEmail = async (req, res, next) => {
  try {
    const token = req.params.token;
    if (!token) {
      throw new CustomError.BadRequestError("Invalid Token");
    }

    const result = jwt.verify(token, process.env.EMAIL_SECRET);
   
    await userModel.update({
      emailVerified: true
    }, {
      where: {
        id: result.user
      }
    });
    res.status(statusCodes.StatusCodes.OK).send("Email Verified");
  }
  catch(error) {
    console.log(error);
    next(error);
  }
}



module.exports = {

  register,
  login,
  logout,
  verifyEmail
};
