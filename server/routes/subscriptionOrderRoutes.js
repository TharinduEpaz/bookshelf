const {Router} = require("express");
const {authenticateUser,authPermissions} = require('../middleware/authUser')
const express = require('express')

const router = Router();

const controller = require('../controllers/orderController')
const checkoutController = require('../controllers/checkoutController')


router.route('/').get(controller.getAllSubscriptionOrders)


module.exports = router;