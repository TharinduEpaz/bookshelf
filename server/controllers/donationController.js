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

  //get request by reg number
    const getRequestByRegNumber = async (req, res, next) => {
        try {
        const { regNumber } = req.params;
        const donation = await donationModel.findOne({
            where: {
                orgRegisteredNumber: regNumber,
            },
        });
        if (!donation) {
            return next(
            new CustomError(
                statusCodes.StatusCodes.NOT_FOUND,
                "Donation request not found"
            )
            );
        }
        res.json(donation);
        } catch (error) {
        next(error);
        }
        // res.send("Get request by reg number");
    };

    //update request
    const updateRequest = async (req, res, next) => {
        try {
        const { id } = req.params;
        const { approval } = req.body;

        const donation = await donationModel.findByPk(id);

        if (!donation) {
            throw new CustomError.NotFoundError(
            `Donation request with id ${id} was not found!`
            );
        }

        const updatedDonation = await donation.update({ approval });

        res.json(updatedDonation);
        } catch (error) {
        next(error);
        }
        // res.send("Update request");
    };

    //count all requests
    const countAllRequests = async (req, res, next) => {
        try {
        const count = await donationModel.count();
        res.json(count);
        } catch (error) {
        next(error);
        }
        // res.send("Count all requests");
    };

    //count pending requests
    const countPendingRequests = async (req, res, next) => {
        try {
        const count = await donationModel.count({
            where: {
            approval: "Pending",
            },
        });
        res.json(count);
        } catch (error) {
        next(error);
        }
        // res.send("Count pending requests");
    };

    //count accepted requests
    const countAcceptedRequests = async (req, res, next) => {
        try {
        const count = await donationModel.count({
            where: {
            approval: "Accepted",
            },
        });
        res.json(count);
        } catch (error) {
        next(error);
        }
        // res.send("Count accepted requests");
    };

    //count rejected requests
    const countRejectedRequests = async (req, res, next) => {
        try {
        const count = await donationModel.count({
            where: {
            approval: "Rejected",
            },
        });
        res.json(count);
        } catch (error) {
        next(error);
        }
        // res.send("Count rejected requests");
    };

module.exports = {
    addRequest,
    getAllRequests,
    getRequestByRegNumber,
    updateRequest,
    countAllRequests,
    countPendingRequests,
    countAcceptedRequests,
    countRejectedRequests
}