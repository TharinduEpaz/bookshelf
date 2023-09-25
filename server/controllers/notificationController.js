const NotificationModel = require("../models/adminNotifications");
const statusCodes = require("http-status-codes");

const getNotifications = async (req, res, next) => {
    try {
        const notifications = await NotificationModel.findAll();
        res.json(notifications);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getNotifications
}