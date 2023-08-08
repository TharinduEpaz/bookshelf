const orderModel = require("../models/order");
const statusCodes = require("http-status-codes");
const CustomError = require("../errors");
const path = require("path");

//get all orders
const getAllOrders = async (req, res, next) => {
    try {
        const orders = await orderModel.findAll(); 
        res.json(orders);
    } catch (err) {
        next(err);
    }
}

//count orders
const countOrders = async (req, res, next) => {
    try {
        const orderCount = await orderModel.count();
        res.json(orderCount);
    } catch (err) {
        next(err);
    }
}


module.exports = {
    getAllOrders,
    countOrders
};