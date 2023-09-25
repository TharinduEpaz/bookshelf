const {Router} = require("express");
const {authenticateUser,authPermissions} = require('../middleware/authUser')

const router = Router();

const controller = require('../controllers/orderController')

router.route('/').get(controller.getAllOrders); // get all orders
router.route('/count').get(controller.countOrders); // count orders
router.route('/').post(authenticateUser,controller.addOrder); // add order
router.route('/changeStatus').post(authenticateUser,controller.changeOrderStatus); // add order
router.route('/getUserOrders').get(authenticateUser,controller.getOrdersByUserId); // add order
router.route('/cancelOrder').post(authenticateUser,controller.cancelOrder); // add order


module.exports = router;