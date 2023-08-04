const {Router} = require("express");
const {authenticateUser,authPermissions} = require('../middleware/authUser')

const router = Router();

const controller = require('../controllers/bookController')






router.route('/').get(controller.getAllBooks);

router.route('/').post(authenticateUser,authPermissions('admin'), controller.addBook);

router.route('/uploadImage').post(authenticateUser,authPermissions('admin'), controller.uploadImage);

router.get('/:id', controller.getSingleBook);

router.route('/:id', ).patch(authenticateUser,authPermissions('admin'), controller.updateBook);

router.route('/:id', ).delete(authenticateUser,authPermissions('admin'), controller.deleteBook);



module.exports = router;