const {Router} = require("express");
const {authenticateUser,authPermissions} = require('../middleware/authUser')

const router = Router();

const controller = require('../controllers/shareRequestController')

router.route('/requests').get(authenticateUser,controller.getAllShareRequests);
router.route('/requests').post(authenticateUser,controller.postShareRequest);

module.exports = router;