const {Router} = require("express");

const router = Router();

const controller = require('../controllers/donationPackController')

router.route('/').get(controller.getAllDonationPacks);
router.route('/').post(controller.addDonationPack);

module.exports = router;