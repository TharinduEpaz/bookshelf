const {Router} = require("express");

const router = Router();

const controller = require('../controllers/donationController')


router.post('/addRequest', controller.addRequest);


module.exports = router;