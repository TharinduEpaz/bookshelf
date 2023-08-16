const {Router} = require("express");
const {authenticateUser,authPermissions} = require('../middleware/authUser')

const router = Router();

const controller = require('../controllers/subscriptionController')

router.route('/').get(controller.getAllSubscriptions);

router.route('/userSubscription').get(controller.getAllUserSubscriptions);

router.route("/addSubscription").post( controller.addSubscriptionType);
router.route ('/details').get(controller.getAllSubscriptionDetails);
router.route("/subscriptionComplaint").post(controller.addSubscriptionCompliant);



module.exports = router;

