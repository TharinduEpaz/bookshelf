const {Router} = require("express");
const {authenticateUser,authPermissions} = require('../middleware/authUser')
const router = Router();

const controller = require('../controllers/notificationController')

router.route('/').get(controller.getNotifications); // get all notifications
router.route('/:id').patch(controller.updateNotificationStatus); // update notification status
router.route('/dashboard').get(authenticateUser, controller.getUserDashboard); // update notification status

module.exports = router;