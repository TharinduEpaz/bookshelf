const {Router} = require("express");

const router = Router();

const controller = require('../controllers/donationController')


router.post('/addRequest', controller.addRequest);
router.get('/', controller.getAllRequests);
router.get('/request/countAccepted', controller.countAcceptedRequests);
router.get('/request/countRejected', controller.countRejectedRequests);
router.get('/request/countPending', controller.countPendingRequests);
router.get('/request/countAll', controller.countAllRequests);
router.get('/request/:regNumber', controller.getRequestByRegNumber);
router.put('/request/:id', controller.updateRequest);


module.exports = router;