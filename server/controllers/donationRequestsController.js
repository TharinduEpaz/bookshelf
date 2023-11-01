const donationRequestsModel = require('../models/donRequests');
const { log } = require('console');
const CustomError = require('../errors');
const statusCodes = require('http-status-codes');
const path = require('path');

//get all donation requests
const getAllDonationRequests = async (req, res, next) => {
    try {
        const donationRequests = await donationRequestsModel.findAll();
        res.status(statusCodes.StatusCodes.OK).json(donationRequests);
    } catch (error) {
        next(error);
    }
}

//add a donation request
const addDonationRequest = async (req, res, next) => {
    try {
        const {
            orgName,
            orgRegisteredNumber,
            requestedItems,
        } = req.body;

        const newDonationRequest = await donationRequestsModel.create({
            orgName,
            orgRegisteredNumber,
            requestedItems,
        });

        res.status(statusCodes.StatusCodes.CREATED).json(newDonationRequest);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllDonationRequests,
    addDonationRequest,
};