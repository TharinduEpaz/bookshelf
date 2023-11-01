const donationPackModel = require('../models/donationPacks');
const { log } = require('console');
const CustomError = require('../errors');
const statusCodes = require('http-status-codes');
const path = require('path');

const addDonationPack = async (req, res, next) => {
    try {
        const { name, donationItems, price, description, stock } = req.body;

        if (!name || !donationItems || !price || !description) {
            throw new CustomError.BadRequestError('Please provide all required details');
        }

        const donationPack = await donationPackModel.create({
            name,
            donationItems,
            price,
            description,
            stock,
        });
        res.status(statusCodes.StatusCodes.CREATED).json(donationPack);
    } catch (error) {
        next(error);
    }
};

const getAllDonationPacks = async (req, res, next) => {
    try {
        const donationPacks = await donationPackModel.findAll();
        res.status(statusCodes.StatusCodes.OK).json(donationPacks);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    addDonationPack,
    getAllDonationPacks,
};