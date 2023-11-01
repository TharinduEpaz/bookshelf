const donationModel = require("../models/donation");
const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const statusCodes = require("http-status-codes");
const CustomError = require("../errors");
const sendMail = require('../utils/sendMail');
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
        const {
            regNumber
        } = req.params;
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
        const {
            id
        } = req.params;
        const {
            approval
        } = req.body;

        const donation = await donationModel.findByPk(id);

        if (!donation) {
            throw new CustomError.NotFoundError(
                `Donation request with id ${id} was not found!`
            );
        }

        const updatedDonation = await donation.update({
            approval
        });

        if (approval === "Accepted") {
            const hashedPassword = await bcrypt.hash(donation.orgRegisteredNumber, 10);

            const user = await userModel.create({
                firstName: donation.orgName,
                email: donation.orgEmail,
                password: hashedPassword,
                role: "requester",
            })

            // sendMail(donation.orgEmail, "Verify Email", `Please click this email to confirm your email`);

            sendMail(donation.orgEmail,
                "Welcome to BookShelf - Your Account Details",

                `Dear ${donation.orgName},<br>
            
            Welcome to BookShelf, the ultimate platform for book enthusiasts! We're excited to have you on board, and we can't wait for you to explore the world of books through our platform.<br>
            
            Your account has been successfully created with the following details:<br>
            
            Organization Name: ${donation.orgName} <br>
            User Name: ${donation.orgEmail} <br>
            Password: ${donation.orgRegisteredNumber} <br>

            To get started, simply log in using your organization email as the username and your organization registration number as the password. We recommend changing your password after your first login for security purposes.<br>
            
            If you have any questions or need assistance, please don't hesitate to contact our support team at bookshelfsrilanka@gmail.com. We're here to help!<br>
            
            Once again, welcome to the BookShelf community. We hope you have a fantastic experience exploring and sharing your love for books.<br>
            
            Happy reading!
            
            Sincerely,
            The BookShelf Team`
            )
        }

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