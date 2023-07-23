const {Router} = require("express");

const router = Router();

const controller = require('../controllers/userController')

router.get('/', controller.getAllUsers);
router.get('/showMe', controller.getCurrentUser);
router.get('/:id', controller.getSingeUser);
router.patch('/updatePassword', controller.updateUserPassword);
router.patch('/:id', controller.updateUser);



module.exports = router;