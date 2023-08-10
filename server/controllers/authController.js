const userModel = require("../models/user");
const notification = require("../models/userNotifications");
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

const verifyEmail = async (req, res, next) => {
  try {
    const {verificationToken, email} = req.body;
    console.log(verificationToken, email);
    const user = await userModel.findOne({
      where: {
        email: email,
      },
    });
    console.log(user);
    if(!user) {
      throw new CustomError.BadRequestError("Verification Failed");
    }
    if(user.emailVerified) {
      throw new CustomError.BadRequestError("Email Already Verified");
    }
    if(user.verificationToken !== verificationToken) {
      throw new CustomError.BadRequestError("Verification Failed");
    }
    user.emailVerified = true;
    await user.save();
    res.status(statusCodes.StatusCodes.OK).json({message: "Email Verified"});
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
