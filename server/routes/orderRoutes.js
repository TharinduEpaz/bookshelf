const {Router} = require("express");
const {authenticateUser,authPermissions} = require('../middleware/authUser')
const express = require('express')

const router = Router();

const controller = require('../controllers/orderController')
const checkoutController = require('../controllers/checkoutController')

router.route('/').get(authenticateUser,authPermissions('admin'),controller.getAllOrders); // get all orders
router.route('/count').get(controller.countOrders); // count orders
router.route('/').post(controller.addOrder); // add order
router.route('/create-payment-intent').post(checkoutController.checkout); // create order
router.route('/checkout/create-payment-intent').post(checkoutController.createPayment); // create order
router.route('/getmyorders').get(authenticateUser,controller.get_orders_by_user)

module.exports = router;