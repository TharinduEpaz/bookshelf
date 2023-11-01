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

//get a donation request by ID
const getDonationRequestByID = async (req, res, next) => {
    try {
        const { id } = req.params;
        const donationRequest = await donationRequestsModel.findOne({
            where: {
                id,
            },
        });

        if (!donationRequest) {
            throw new CustomError.NotFoundError(`Donation request with id ${id} was not found`);
        }

        res.status(statusCodes.StatusCodes.OK).json(donationRequest);
    } catch (error) {
        next(error);
    }
}

//update a donation request
const updateDonationRequest = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { approval } = req.body;

        const donationRequest = await donationRequestsModel.findByPk(id);

        if (!donationRequest) {
            throw new CustomError.NotFoundError(`Donation request with id ${id} was not found`);
        }

        await donationRequest.update({
            approval,
        });

        res.status(statusCodes.StatusCodes.OK).json(donationRequest);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllDonationRequests,
    addDonationRequest,
    getDonationRequestByID,
    updateDonationRequest,
};