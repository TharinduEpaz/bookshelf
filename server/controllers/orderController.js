const orderModel = require("../models/order");
const statusCodes = require("http-status-codes");
const CustomError = require("../errors");
const path = require("path");

//create order
const addOrder = async (req, res, next) => {
	try {
		const { orderDate, orderStatus, totalPrice} = req.body;
		const buyer_id = req.user.id;
		
		console.log(
			"Order values:",
			orderDate,
			orderStatus,
			totalPrice,
			buyer_id
		);

		const order = await orderModel.create({
			orderDate,
			orderStatus,
			totalPrice,
			buyer_id,
		});

		console.log("Created order:", order);

		res.status(statusCodes.StatusCodes.CREATED).json(order);
	} catch (error) {
		console.error("Error adding order:", error);
		next(error);
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

//get order by id
const getOrder = async (req, res, next) => {
	try {
		const { id } = req.params;
		const order = await orderModel.findByPk(id);
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
	getOrder
};
