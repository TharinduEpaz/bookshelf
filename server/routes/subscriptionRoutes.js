const {Router} = require("express");
const {authenticateUser,authPermissions} = require('../middleware/authUser')

const router = Router();

const controller = require('../controllers/subscriptionController')

router.route('/').get(controller.getAllSubscriptions);

router.route('/userSubscription').get(controller.getAllUserSubscriptions);

router.route("/addSubscription").post(authenticateUser, controller.addSubscriptionType);
// router.route ('/details').get(controller.getAllSubscriptionDetails);
router.route("/subscriptionComplaint").post(controller.addSubscriptionCompliant);

router.route("/getMySubscription").get(authenticateUser ,controller.getMySubscriptionDetails);
router.route("/updateMySubscription").patch(authenticateUser ,controller.updateMySubscription);
router.route("/deleteMySubscription").delete(authenticateUser, controller.deleteMySubscription);
router.route("/bookSubscription").post(authenticateUser,controller.add_book_to_a_subscription_plan);
router.route("/checkSubscription").get(authenticateUser, controller.checkSubscription);
router.route("/selectBooks").get(authenticateUser,controller.get_books_in_subscription_plan);
router.route("/removeBook").post(authenticateUser,controller.delete_book_in_subscription_plan);


router.route("/:id").get(controller.getSingleBook);

module.exports = router;