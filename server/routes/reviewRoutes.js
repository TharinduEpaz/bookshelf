const {Router} = require("express");
const {authenticateUser,authPermissions} = require('../middleware/authUser')

const router = Router();

const controller = require('../controllers/reviewController')

router.route('/').get(controller.getAllReviews); // get all reviews
router.route('/:id').get(controller.getReviewsByBook); // get all reviews
router.route('/').post(authenticateUser,controller.addReview); // add review
router.route('/:id').delete(authenticateUser,authPermissions('admin'),controller.deleteReview); // delete review


module.exports = router;