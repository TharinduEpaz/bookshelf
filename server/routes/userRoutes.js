const {Router} = require("express");
const {authenticateUser,authPermissions} = require('../middleware/authUser')

const router = Router();

const controller = require('../controllers/userController')

// router.route('/').get(authenticateUser,authPermissions('admin'), controller.getAllUsers);
router.get('/showMe',authenticateUser, controller.getCurrentUser);
router.post('/changeShippingDetails',authenticateUser, controller.changeShippingDetails);
router.get('/getbuyerinfo',authenticateUser, controller.getBuyerDetails);

router.get('/:id', controller.getSingeUser);
router.patch('/updatePassword',authenticateUser, controller.updateUserPassword);
router.patch('/:id', controller.updateUser);
router.get('/getNotifications/:id', controller.getNotifications);


router.route('/').post(controller.addUser);
//router.route('/').post(authenticateUser,authPermissions('admin'), controller.addUser);

router.get('/', controller.getAllUsers);

router.route('/:id', ).delete(controller.deleteUser);


module.exports = router;