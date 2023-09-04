const {Router} = require("express");
const {authenticateUser,authPermissions} = require('../middleware/authUser')

const router = Router();

const controller = require('../controllers/subscriptionController')

router.route('/').get(controller.getAllSubscriptions);

router.route('/userSubscription').get(controller.getAllUserSubscriptions);

router.route("/addSubscription").post(authenticateUser, controller.addSubscriptionType);
// router.route ('/details').get(controller.getAllSubscriptionDetails);
router.route("/subscriptionComplaint").post(controller.addSubscriptionCompliant);

router.route("/getMySubscription").get( authenticateUser ,controller.getMySubscriptionDetails);
router.route("/updateMySubscription").patch(authenticateUser ,controller.updateMySubscription);
// router.route("/deleteMySubscription").delete(controller.deleteMySubscription);

router.route('/').post(controller.addSubscriptionPlan);




module.exports = router;