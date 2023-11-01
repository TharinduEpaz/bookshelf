const {Router} = require("express");
const {authenticateUser,authPermissions} = require('../middleware/authUser')

const router = Router();

const controller = require('../controllers/orderController')
const checkoutController = require('../controllers/checkoutController')

router.route('/').get(controller.getAllOrders); // get all orders
router.route('/countPending').get(controller.countPendingOrders); // count pending orders
router.route('/count').get(controller.countOrders); // count orders
router.route('/').post(controller.addOrder); // add order
router.route('/create-payment-intent').post(checkoutController.checkout); // create order
router.route('/checkout/config').get(checkoutController.config); // create order
router.route('/checkout/create-payment-intent').post(checkoutController.createPayment); // create order
router.route('/getmyorders').get(authenticateUser,controller.get_orders_by_user)
router.route('/getmysubscriptionorders').get(authenticateUser,controller.get_subscription_orders_by_user)
router.route("/extenddate").post(authenticateUser, checkoutController.extendDate);
router.route('/:id').get(controller.getOrder); // get order by id
router.route('/:id').put(controller.updateOrderStatus); // update order by id
router.route('/:id').delete(controller.deleteOrder); // delete order by id


module.exports = router;