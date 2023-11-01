const {Router} = require("express");

const router = Router();

const controller = require('../controllers/donationRequestsController')

router.route('/').get(controller.getAllDonationRequests);
router.route('/').post(controller.addDonationRequest);

module.exports = router;