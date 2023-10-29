const {Router} = require("express");
const {authenticateUser,authPermissions} = require('../middleware/authUser')

const router = Router();

const controller = require('../controllers/shareRequestController')

router.route('/requests').get(controller.getAllShareRequests);
router.route('/requests').post(controller.postShareRequest);
router.route('/search').get(controller.getShareRequestNames);
router.route('/deleteBooks/:id').delete( controller.delete_books);

module.exports = router;