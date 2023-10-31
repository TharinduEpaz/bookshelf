const {Router} = require("express");
const {authenticateUser,authPermissions} = require('../middleware/authUser');

const router = Router();

const controller = require('../controllers/bookController')

router.route('/').get(controller.getAllBooks);

router.route('/').post(controller.addBook);

router.route('/count').get(controller.getBookCount);

router.route('/inStockCount').get(controller.getInStockBookCount);

router.route('/uploadImage').post(controller.uploadImage);

router.route('/searchBooks').post(controller.searchBooks);

router.route('/getBookNames').get(controller.getBookNames);

router.route('/getBookNames').get(controller.getBookNames);

router.route('/paginated').get(controller.getPaginatedBooks);

router.route('/filter/:category').get(controller.filterBooks);

router.get('/:id', controller.getSingleBook);

router.route('/:id', ).patch(controller.updateBook);

router.route('/:id', ).delete(controller.deleteBook);






module.exports = router;