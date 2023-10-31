const {Router} = require("express");

const router = Router();

const controller = require('../controllers/donationRequestsController')

router.route('/').get(controller.getAllDonationRequests);

module.exports = router;