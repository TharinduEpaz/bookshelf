const {Router} = require("express");
const {authenticateUser,authPermissions} = require('../middleware/authUser')
const router = Router();

const controller = require('../controllers/notificationController')

router.route('/').get(controller.getNotifications); // get all notifications

module.exports = router;