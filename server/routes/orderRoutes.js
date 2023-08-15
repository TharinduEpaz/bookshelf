const {Router} = require("express");
const {authenticateUser,authPermissions} = require('../middleware/authUser')

const router = Router();

const controller = require('../controllers/orderController')

router.route('/').get(controller.getAllOrders); // get all orders
router.route('/count').get(controller.countOrders); // count orders
router.route('/').post(controller.addOrder); // add order


module.exports = router;