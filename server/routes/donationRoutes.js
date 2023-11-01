const {Router} = require("express");

const router = Router();

const controller = require('../controllers/donationController')


router.post('/addRequest', controller.addRequest);
router.get('/', controller.getAllRequests);


module.exports = router;