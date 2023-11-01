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
            orgName,
            orgType,
            orgRegisteredNumber,
            orgTelephone,
            orgAddress,
            orgEmail,
            orgConfirmationDocument,
            contactPersonName,
            contactPersonPhone,
            contactPersonEmail,
            contactPersonNIC,
            description
        } = req.body;

        if (!orgName || !orgType || !orgRegisteredNumber || !orgTelephone || !orgAddress || !orgEmail || !contactPersonName || !contactPersonPhone || !contactPersonEmail || !contactPersonPhone || !contactPersonNIC || !description) {
            return next(new CustomError(statusCodes.BAD_REQUEST, "Missing required fields"));
        }

        const donation = await donationModel.create({
            orgName,
            orgType,
            orgRegisteredNumber,
            orgTelephone,
            orgAddress,
            orgEmail,
            orgConfirmationDocument,
            contactPersonName,
            contactPersonPhone,
            contactPersonEmail,
            contactPersonNIC,
            description
        });
        
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