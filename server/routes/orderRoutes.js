const {Router} = require("express");
const {authenticateUser,authPermissions} = require('../middleware/authUser')

const router = Router();

const controller = require('../controllers/orderController')
const checkoutController = require('../controllers/checkoutController')

router.route('/').get(controller.getAllOrders); // get all orders
router.route('/count').get(controller.countOrders); // count orders
router.route('/').post(controller.addOrder); // add order
router.route('/create-payment-intent').post(checkoutController.checkout); // create order
router.route('/checkout/config').get(checkoutController.config); // create order
router.route('/checkout/create-payment-intent').post(checkoutController.createPayment); // create order


module.exports = router;