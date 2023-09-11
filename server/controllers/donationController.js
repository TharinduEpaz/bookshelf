const donationModel = require("../models/donation");
const bcrypt = require("bcrypt");
const statusCodes = require("http-status-codes");
const CustomError = require("../errors");
const {
    attachCookiesToResponse
} = require("../utils/jwt");


const addRequest = async (req, res, next) => {

    try {
        const {
            fullName,
            nic,
            address,
            contactNumber,
            email,
            description
        } = req.body;

        if (!fullName || !nic || !address || !contactNumber || !email || !description) {
            return next(new CustomError(statusCodes.BAD_REQUEST, "Missing required fields"));
        }

        const donation = await donationModel.create({
            fullName,
            nic,
            address,
            contactNumber,
            email,
            description
        });
<<<<<<< HEAD
=======
        
>>>>>>> 1d7fb02ac1782bbd8f69374ec69eea28b237b13d
        res.status(statusCodes.StatusCodes.CREATED).json(donation);
    } catch (error) {
        next(error);
    }
    // res.send(req.body.name)

};

const getAllRequests = async (req, res, next) => {
    try {
      const donations = (await donationModel.findAll());
      res.json(donations);
    } catch (error) {
      next(error);
    }
    // res.send("Get all requests");
  };


module.exports = {
    addRequest,
    getAllRequests
}