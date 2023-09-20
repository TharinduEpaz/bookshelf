const {Router} = require("express");
const {authenticateUser,authPermissions} = require('../middleware/authUser')
const {imageUpload} = require('../middleware/imageUpload')

const router = Router();

const controller = require('../controllers/bookController')






router.route('/').get(controller.getAllBooks);

router.route('/').post(controller.addBook);

router.route('/uploadImage').post(controller.uploadImage);

router.get('/:id', controller.getSingleBook);

router.route('/:id', ).patch(controller.updateBook);

router.route('/:id', ).delete(controller.deleteBook);

router.route('/count').get(controller.getBookCount);



module.exports = router;