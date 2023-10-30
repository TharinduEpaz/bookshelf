const NotificationModel = require("../models/adminNotifications");
const orderModel = require("../models/order")
const subscriptionModel = require('../models/userSubscription')
const shareRequestModel = require("../models/shareRequests");
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
const getUserDashboard = async (req,res,next) => {
    try{
        const orderCount = await orderModel.count({
            where:{
                user_id: req.user.userId
            }
        });

        const subscription = await subscriptionModel.findOne(
            {
                where:{
                    userId:req.user.userId
                },
                attributes:['subscriptionType']
                    
                
            }
        )

        const shareRequests = await shareRequestModel.count({
            where:{
                userId:req.user.userId
            }
        })


        const dashboard = {
            orderCount:orderCount,
            subscription:subscription.subscriptionType || 'No Subscription',
            shareRequests:shareRequests,
            

        }

        res.json(dashboard);

    }
    catch(error){
        next(error)
    }
  
}

module.exports = {
    getNotifications,
    updateNotificationStatus,
    getUserDashboard,
}