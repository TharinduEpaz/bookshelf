const {Router} = require("express");

const router = Router();

const controller = require('../controllers/donationRequestsController')

router.route('/').get(controller.getAllDonationRequests);
router.route('/').post(controller.addDonationRequest);
router.route('/:id').get(controller.getDonationRequestByID);
router.route('/:id').put(controller.updateDonationRequest);

module.exports = router;