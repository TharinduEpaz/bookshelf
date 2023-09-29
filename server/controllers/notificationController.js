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

// update notification status
const updateNotificationStatus = async (req, res, next) => {
    try {
        const notificationId = req.params.id;
        const notification = await NotificationModel.findByPk(notificationId);
        if (!notification) {
            return res.status(statusCodes.NOT_FOUND).json({
                message: "Notification not found"
            });
        }
        const updatedNotification = await notification.update({
            status: 1
        });
        res.json(updatedNotification);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getNotifications,
    updateNotificationStatus
}