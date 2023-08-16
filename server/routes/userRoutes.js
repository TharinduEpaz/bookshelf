const {Router} = require("express");
const {authenticateUser,authPermissions} = require('../middleware/authUser')

const router = Router();

const controller = require('../controllers/userController')


router.route('/').post(controller.addUser);
//router.route('/').post(authenticateUser,authPermissions('admin'), controller.addUser);

router.get('/', controller.getAllUsers);
//router.route('/').get(controller.getAllUsers);
//router.route('/').get(authenticateUser,authPermissions('admin'), controller.getAllUsers);

router.get('/showMe',authenticateUser, controller.getCurrentUser);
router.get('/:id', controller.getSingeUser);

router.patch('/updatePassword',authenticateUser, controller.updateUserPassword);
router.patch('/:id', controller.updateUser);

router.delete('/:id', controller.deleteUser);


module.exports = router;