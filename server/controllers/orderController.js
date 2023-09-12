const orderModel = require("../models/order");
const userModel = require("../models/user");
const statusCodes = require("http-status-codes");
const CustomError = require("../errors");
const path = require("path");
const { or } = require("sequelize");

//relationship associations
userModel.hasMany(orderModel);
orderModel.belongsTo(userModel);

// orderModel.sync({ alter: true });

//create order
const addOrder = async (req, res, next) => {
    try {
        const {
            orderDate,
            orderStatus,
            totalPrice,
            buyer_id
        } = req.body;

        console.log("Order values:", orderDate, orderStatus, totalPrice, buyer_id);

    const order = await orderModel.create({
      orderDate,
      orderStatus,
      totalPrice,
      orderItems,
      UserId,
      is_paid,
    });

    res.status(statusCodes.StatusCodes.CREATED).json(order);
  } catch (error) {
    console.error("Error adding order:", error);
    next(error);
  }
};

const changeOrderStatus = async (req, res, next) => {
    try {

        const { orderStatus } = req.body;
        const { id } = req.body;

        const order = await orderModel.findOne({
            where: {
                id
            }
        });
        if (!order) {
            throw new CustomError.NotFoundError('No order found');
        }
        order.orderStatus = orderStatus;
        await order.save();
        res.json(order);
    } catch (err) {
        next(err);
    }
};

//get all orders
const getAllOrders = async (req, res, next) => {
  try {
    const orders = await orderModel.findAll();
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

const getOrdersByUserId = async (req, res, next) => {
    try {
        const UserId = req.user.userId;
        const orders = await orderModel.findAll({
            where: {
                UserId
            }
        });
        res.json(orders);
    } catch (err) {
        next(err);
    }
};

//count orders
const countOrders = async (req, res, next) => {
  try {
    const orderCount = await orderModel.count();
    res.json(orderCount);
  } catch (err) {
    next(err);
  }
};

//create order
const createOrder = async (req, res, next) => {
  try {
    const { orderDate, orderStatus, totalPrice, buyer_id } = req.body;
    const order = await orderModel.create({
      totalPrice,
      buyer_id,
      orderDate,
    });
    res.status(statusCodes.StatusCodes.CREATED).json(order);
  } catch (err) {
    next(err);
  }
};

const cancelOrder = async (req, res, next) => {
    try {
        const { id } = req.body;
        const order = await orderModel.findOne({
            where: {
                id
            }
        });
        if (!order) {
            throw new CustomError.NotFoundError('No order found');
        }
        
        //users can only cancel the pending orders only
        
        if (order.orderStatus === 'pending') {
            order.orderStatus = 'cancelled';
            await order.save();
        }
        else
        {
            throw new CustomError.BadRequestError('Order cannot be cancelled');
        }

        res.json(order);
    } catch (err) {
        next(err);
    }
};


module.exports = {
  addOrder,
  getAllOrders,
  countOrders,
  createOrder,
 changeOrderStatus,
    getOrdersByUserId,
    cancelOrder,
};

