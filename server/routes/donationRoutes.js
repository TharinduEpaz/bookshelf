const {Router} = require("express");

const router = Router();

const controller = require('../controllers/donationController')


router.post('/addRequest', controller.addRequest);
router.get('/', controller.getAllRequests);
router.get('/request/:regNumber', controller.getRequestByRegNumber);
router.put('/request/:id', controller.updateRequest);


module.exports = router;