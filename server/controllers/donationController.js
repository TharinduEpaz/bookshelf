const donationModel = require("../models/donation");
const bcrypt = require("bcrypt");
const statusCodes = require("http-status-codes");
const CustomError = require("../errors");
const { attachCookiesToResponse } = require("../utils/jwt");


const addRequest = async (req, res, next) => {

    res.send(req.body.name)


}


module.exports = {
    addRequest
}